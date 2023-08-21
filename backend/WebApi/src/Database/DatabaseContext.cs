using Microsoft.EntityFrameworkCore;
using Npgsql;
using WebApiDomain.Entities;

namespace WebApi.Database;

public class DatabaseContext:DbContext
{
 public readonly IConfiguration _config;
 public DbSet<User> Users { get;set; }
 public DbSet<Product> Products { get; set; }
 public DbSet<Order> Orders { get; set; }
 public DbSet<OrderProducts> OrderProducts { get; set; }
 public DbSet<Image> Images  { get; set; }

 public DatabaseContext(DbContextOptions options, IConfiguration config):base(options)
 {
  _config = config;
 }

 static DatabaseContext()
 {
   AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
   AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

 }
 
 protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
 {
   var builder = new NpgsqlDataSourceBuilder(_config.GetConnectionString("Default"));
   optionsBuilder.AddInterceptors(new TimeStampInterceptor());
   optionsBuilder.UseNpgsql(builder.Build()).UseSnakeCaseNamingConvention();
   builder.MapEnum<Role>();
 }
 protected override void OnModelCreating(ModelBuilder modelBuilder)
 {
   modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
   modelBuilder.HasPostgresEnum<Role>();
   modelBuilder.Entity<OrderProducts>().HasKey("OrderId", "ProductId");
   
   // Changes created at and updated at to be the current time upon creation
   // modelBuilder.Entity<User>()
   //   .Property(u => u.CreatedAt)
   //   .HasDefaultValueSql("NOW()");
   // modelBuilder.Entity<User>()
   //   .Property(u => u.UpdatedAt)
   //   .HasDefaultValueSql("NOW()");
 }
}
