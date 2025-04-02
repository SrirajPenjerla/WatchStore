using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using WatchStoreAPI.Data;
using WatchStoreAPI.Models;
using WatchStoreAPI.Services;

namespace WatchStoreAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class PaymentController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly StripeService _stripeService;
    private readonly ILogger<PaymentController> _logger;
    private readonly StripeSettings _stripeSettings;

    public PaymentController(
        ApplicationDbContext context,
        UserManager<User> userManager,
        StripeService stripeService,
        ILogger<PaymentController> logger,
        IConfiguration configuration)
    {
        _context = context;
        _userManager = userManager;
        _stripeService = stripeService;
        _logger = logger;
        _stripeSettings = configuration.GetSection("Stripe").Get<StripeSettings>() 
            ?? throw new InvalidOperationException("Stripe settings not configured");

        StripeConfiguration.ApiKey = _stripeSettings.SecretKey;
    }

    [HttpPost("create-payment-intent")]
    public async Task<ActionResult<PaymentIntent>> CreatePaymentIntent()
    {
        try
        {
            var userId = _userManager.GetUserId(User) ?? throw new InvalidOperationException("User ID not found");
            var user = await _userManager.FindByIdAsync(userId) ?? throw new InvalidOperationException("User not found");
            
            var cart = await _context.Carts
                .Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.UserId == userId);

            if (cart == null || !cart.CartItems.Any())
            {
                return BadRequest("Cart is empty");
            }

            var totalAmount = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity);

            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)(totalAmount * 100), // Convert to cents
                Currency = "usd",
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true
                },
                Metadata = new Dictionary<string, string>
                {
                    { "UserId", userId }
                }
            };

            var service = new PaymentIntentService();
            var intent = await service.CreateAsync(options);

            return Ok(new { clientSecret = intent.ClientSecret });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating payment intent");
            return StatusCode(500, "An error occurred while creating the payment intent");
        }
    }

    [HttpPost("webhook")]
    [AllowAnonymous]
    public async Task<IActionResult> HandleWebhook()
    {
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var stripeSignature = Request.Headers["Stripe-Signature"];

        if (string.IsNullOrEmpty(stripeSignature))
        {
            return BadRequest("No Stripe signature found");
        }

        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                stripeSignature,
                _stripeSettings.WebhookSecret
            );

            switch (stripeEvent.Type)
            {
                case Events.PaymentIntentSucceeded:
                    var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    if (paymentIntent != null)
                    {
                        var userId = paymentIntent.Metadata["UserId"];
                        var user = await _userManager.FindByIdAsync(userId);
                        if (user == null) break;

                        var order = await _context.Orders
                            .Include(o => o.OrderItems)
                            .FirstOrDefaultAsync(o => o.UserId == userId && o.Status == OrderStatus.Pending);

                        if (order != null)
                        {
                            order.Status = OrderStatus.Processing;
                            order.PaymentIntentId = paymentIntent.Id;
                            order.PaymentStatus = PaymentStatus.Succeeded;

                            var payment = new Payment
                            {
                                Order = order,
                                OrderId = order.Id,
                                User = user,
                                UserId = userId,
                                Amount = paymentIntent.Amount / 100m, // Convert from cents
                                PaymentIntentId = paymentIntent.Id,
                                PaymentMethod = WatchStoreAPI.Models.PaymentMethod.Card,
                                Status = PaymentStatus.Succeeded,
                                CompletedAt = DateTime.UtcNow
                            };

                            _context.Payments.Add(payment);
                            await _context.SaveChangesAsync();
                        }
                    }
                    break;

                case Events.PaymentIntentPaymentFailed:
                    var failedPaymentIntent = stripeEvent.Data.Object as PaymentIntent;
                    if (failedPaymentIntent != null)
                    {
                        var userId = failedPaymentIntent.Metadata["UserId"];
                        var order = await _context.Orders
                            .FirstOrDefaultAsync(o => o.UserId == userId && o.Status == OrderStatus.Pending);

                        if (order != null)
                        {
                            order.Status = OrderStatus.Cancelled;
                            order.PaymentStatus = PaymentStatus.Failed;
                            await _context.SaveChangesAsync();
                        }
                    }
                    break;
            }

            return Ok();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling webhook");
            return StatusCode(500, "An error occurred while handling the webhook");
        }
    }
}

public class PaymentIntentResponse
{
    public required string ClientSecret { get; set; }
    public int OrderId { get; set; }
} 