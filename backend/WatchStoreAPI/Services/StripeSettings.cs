namespace WatchStoreAPI.Services
{
    public class StripeSettings
    {
        public required string SecretKey { get; set; }
        public required string WebhookSecret { get; set; }
    }
} 