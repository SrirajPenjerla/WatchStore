using Microsoft.Extensions.Configuration;
using Stripe;
using WatchStoreAPI.Models;

namespace WatchStoreAPI.Services;

public class StripeService
{
    private readonly string _secretKey;
    private readonly string _webhookSecret;
    private readonly IConfiguration _configuration;

    public StripeService(IConfiguration configuration)
    {
        _configuration = configuration;
        _secretKey = _configuration["Stripe:SecretKey"] ?? throw new InvalidOperationException("Stripe:SecretKey is not configured");
        _webhookSecret = _configuration["Stripe:WebhookSecret"] ?? throw new InvalidOperationException("Stripe:WebhookSecret is not configured");
        StripeConfiguration.ApiKey = _secretKey;
    }

    public async Task<PaymentIntent> CreatePaymentIntentAsync(decimal amount, string currency = "usd")
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(amount * 100), // Convert to cents
            Currency = currency,
            AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
            {
                Enabled = true,
            },
        };

        var service = new PaymentIntentService();
        return await service.CreateAsync(options);
    }

    public async Task<PaymentIntent> GetPaymentIntentAsync(string paymentIntentId)
    {
        var service = new PaymentIntentService();
        return await service.GetAsync(paymentIntentId);
    }

    public async Task<PaymentIntent> UpdatePaymentIntentAsync(string paymentIntentId, decimal amount)
    {
        var options = new PaymentIntentUpdateOptions
        {
            Amount = (long)(amount * 100), // Convert to cents
        };

        var service = new PaymentIntentService();
        return await service.UpdateAsync(paymentIntentId, options);
    }

    public async Task<PaymentIntent> CancelPaymentIntentAsync(string paymentIntentId)
    {
        var service = new PaymentIntentService();
        return await service.CancelAsync(paymentIntentId);
    }

    public Event HandleWebhookAsync(string json, string signatureHeader)
    {
        try
        {
            var stripeEvent = EventUtility.ConstructEvent(
                json,
                signatureHeader,
                _webhookSecret
            );

            return stripeEvent;
        }
        catch (StripeException e)
        {
            throw new Exception($"Stripe webhook error: {e.Message}");
        }
    }
} 