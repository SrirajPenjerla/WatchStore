using Microsoft.EntityFrameworkCore;
using WatchStoreAPI.Models;

namespace WatchStoreAPI.Data;

public static class DbSeeder
{
    private static readonly DateTime _seedDate = new(2024, 1, 1, 0, 0, 0, DateTimeKind.Utc);

    public static void SeedData(ModelBuilder modelBuilder)
    {
        // Add sample products
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1001,
                Name = "Classic Chronograph Watch",
                Description = "A timeless chronograph watch with leather strap",
                Price = 299.99m,
                StockQuantity = 10,
                Brand = "TimeKeeper",
                Category = "Chronograph",
                ImageUrl = "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1002,
                Name = "Luxury Diver Watch",
                Description = "Professional diving watch with 300m water resistance",
                Price = 599.99m,
                StockQuantity = 5,
                Brand = "OceanMaster",
                Category = "Diver",
                ImageUrl = "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1003,
                Name = "Minimalist Automatic Watch",
                Description = "Clean and simple automatic watch with mesh bracelet",
                Price = 199.99m,
                StockQuantity = 15,
                Brand = "SimpleTime",
                Category = "Automatic",
                ImageUrl = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
                IsTrending = false,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1004,
                Name = "Smart Hybrid Watch",
                Description = "Smart watch with traditional watch aesthetics",
                Price = 399.99m,
                StockQuantity = 8,
                Brand = "TechTime",
                Category = "Smart Watch",
                ImageUrl = "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1005,
                Name = "Vintage Pilot Watch",
                Description = "Classic pilot watch with leather strap",
                Price = 449.99m,
                StockQuantity = 3,
                Brand = "SkyMaster",
                Category = "Pilot",
                ImageUrl = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=500",
                IsTrending = false,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            // New products
            new Product
            {
                Id = 1006,
                Name = "Casio G-Shock",
                Description = "Durable and rugged watch with shock resistance",
                Price = 99.99m,
                StockQuantity = 20,
                Brand = "Casio",
                Category = "Digital",
                ImageUrl = "assets/images/casio.jpg",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1007,
                Name = "Fossil Gen 5",
                Description = "Smartwatch with fitness tracking features",
                Price = 249.99m,
                StockQuantity = 15,
                Brand = "Fossil",
                Category = "Smart Watch",
                ImageUrl = "assets/images/fossil.jpg",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1008,
                Name = "Seiko 5 Automatic",
                Description = "Classic automatic watch with a transparent case back",
                Price = 299.99m,
                StockQuantity = 10,
                Brand = "Seiko",
                Category = "Automatic",
                ImageUrl = "assets/images/seikoo.jpg",
                IsTrending = false,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1009,
                Name = "Tissot PRX",
                Description = "Elegant Swiss watch with a quartz movement",
                Price = 399.99m,
                StockQuantity = 8,
                Brand = "Tissot",
                Category = "Quartz",
                ImageUrl = "assets/images/tissot.jpg",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1010,
                Name = "Tag Heuer Carrera",
                Description = "Luxury chronograph watch with a sporty design",
                Price = 4999.99m,
                StockQuantity = 5,
                Brand = "Tag Heuer",
                Category = "Chronograph",
                ImageUrl = "assets/images/tagheureea.jpg",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1011,
                Name = "Longines Master Collection",
                Description = "Elegant watch with a classic design",
                Price = 1999.99m,
                StockQuantity = 4,
                Brand = "Longines",
                Category = "Automatic",
                ImageUrl = "assets/images/logines.jpg",
                IsTrending = false,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1012,
                Name = "Hamilton Khaki Field",
                Description = "Military-style watch with a rugged design",
                Price = 649.99m,
                StockQuantity = 6,
                Brand = "Hamilton",
                Category = "Automatic",
                ImageUrl = "assets/images/hamilton.jpg",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1013,
                Name = "Citizen Eco-Drive",
                Description = "Solar-powered watch with a sleek design",
                Price = 299.99m,
                StockQuantity = 12,
                Brand = "Citizen",
                Category = "Solar",
                ImageUrl = "assets/images/citizenecodrive.jpg",
                IsTrending = true,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            },
            new Product
            {
                Id = 1014,
                Name = "Bulova Lunar Pilot",
                Description = "Limited edition watch with a unique design",
                Price = 499.99m,
                StockQuantity = 7,
                Brand = "Bulova",
                Category = "Chronograph",
                ImageUrl = "assets/images/bulova.jpg",
                IsTrending = false,
                CreatedAt = _seedDate,
                UpdatedAt = _seedDate
            }
        );
    }
} 