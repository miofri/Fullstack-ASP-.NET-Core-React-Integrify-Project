using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics.Internal;
using Npgsql;
using WebApiDomain.Entities;

namespace WebApi.Database;

public class DatabaseContext : DbContext
{
    public readonly IConfiguration _config;
    private readonly TimeStampInterceptor _interceptor;
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderProducts> OrderProducts { get; set; }
    public DbSet<Image> Images { get; set; }

    public DatabaseContext(
        DbContextOptions options,
        IConfiguration config,
        TimeStampInterceptor timeStampInterceptor
    )
        : base(options)
    {
        _interceptor = timeStampInterceptor;
        _config = config;
    }

    static DatabaseContext()
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        AppContext.SetSwitch("Npgsql.DisableDateTimeInfinityConversions", true);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
        // optionsBuilder.AddInterceptors(_interceptor);
        // optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
        // builder.MapEnum<Role>();
        // builder.MapEnum<OrderStatus>();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        modelBuilder.HasPostgresEnum<Role>();
        modelBuilder.HasPostgresEnum<OrderStatus>();
        modelBuilder.Entity<OrderProducts>().HasKey("OrderId", "ProductId");
    }
}

// protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
// {
//     // Below code has been moved to the program.cs file due to the npgslp version 4 recomentations not to create new npgsqldatasourcebuilder within the scope
//     // var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
//     // builder.MapEnum<UserRole>();
//     // builder.MapEnum<OrderStatus>();
//     // optionsBuilder.AddInterceptors(new TimeStampInterceptor());
//     // optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
// }
