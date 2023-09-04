using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics.Internal;
using Npgsql;
using WebApiDomain.Entities;

namespace WebApi.Database;

public class DatabaseContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProducts> OrderProducts { get; set; }
    public DbSet<Image> Images { get; set; }

    public DatabaseContext(DbContextOptions options)
        : base(options) { }

    static DatabaseContext()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.HasPostgresEnum<Role>();
        modelBuilder.HasPostgresEnum<OrderStatus>();
        modelBuilder.Entity<OrderProducts>().HasKey("OrderId", "ProductId");
    }
}
