using System.ComponentModel.DataAnnotations;

namespace WatchStoreAPI.Models;

public class CartItem
{
    public int Id { get; set; }

    [Required]
    public int CartId { get; set; }
    public virtual Cart? Cart { get; set; }

    [Required]
    public int ProductId { get; set; }
    public virtual Product? Product { get; set; }

    [Required]
    [Range(1, 100)]
    public int Quantity { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
} 