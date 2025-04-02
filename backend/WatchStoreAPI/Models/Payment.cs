using System.ComponentModel.DataAnnotations;

namespace WatchStoreAPI.Models
{
    public enum PaymentMethod
    {
        Card,
        PayPal,
        BankTransfer
    }

    public class Payment
    {
        public int Id { get; set; }

        [Required]
        public required Order Order { get; set; }
        public int OrderId { get; set; }

        [Required]
        public required User User { get; set; }
        public required string UserId { get; set; }

        [Required]
        public PaymentMethod PaymentMethod { get; set; }

        [Required]
        public PaymentStatus Status { get; set; } = PaymentStatus.Pending;

        [Required]
        [StringLength(100)]
        public required string PaymentIntentId { get; set; }

        [Required]
        [Range(0.01, 1000000)]
        public decimal Amount { get; set; }

        public string Currency { get; set; } = "usd";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; }
    }
} 