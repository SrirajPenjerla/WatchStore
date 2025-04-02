using System.ComponentModel.DataAnnotations;

namespace WatchStoreAPI.Models
{
    public class Cart
    {
        public int Id { get; set; }

        [Required]
        public required string UserId { get; set; }

        public virtual User? User { get; set; }

        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
} 