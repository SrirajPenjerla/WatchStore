using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WatchStoreAPI.Data;
using WatchStoreAPI.Models;

namespace WatchStoreAPI.Controllers;

[Authorize]
public class OrdersController : BaseApiController
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(
        ApplicationDbContext context,
        UserManager<User> userManager,
        ILogger<OrdersController> logger)
    {
        _context = context;
        _userManager = userManager;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
    {
        var userId = _userManager.GetUserId(User) ?? throw new InvalidOperationException("User ID not found");
        
        var orders = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .Where(o => o.UserId == userId)
            .OrderByDescending(o => o.CreatedAt)
            .ToListAsync();

        return Ok(orders);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrder(int id)
    {
        var userId = _userManager.GetUserId(User) ?? throw new InvalidOperationException("User ID not found");
        
        var order = await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Product)
            .FirstOrDefaultAsync(o => o.Id == id && o.UserId == userId);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(order);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder()
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

        var order = new Order
        {
            UserId = userId,
            User = user,
            Status = OrderStatus.Pending,
            TotalAmount = cart.CartItems.Sum(ci => ci.Product.Price * ci.Quantity)
        };

        order.OrderItems = cart.CartItems.Select(ci => new OrderItem
        {
            Order = order,
            Product = ci.Product,
            ProductId = ci.ProductId,
            Quantity = ci.Quantity,
            Price = ci.Product.Price
        }).ToList();

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cart.CartItems);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
    }
} 