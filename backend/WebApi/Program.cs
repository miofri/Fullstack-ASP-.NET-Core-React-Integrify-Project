using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using WebApi.Database;
using WebApi.RepoImplementations;
using WebApi.src.RepoImplementations;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Implementations;
using WebApiBusiness.Shared;
using WebApiDomain.Abstractions;
using System.Text.Json.Serialization;
using Npgsql;
using System.ComponentModel.DataAnnotations;
using WebApiDomain.Entities;

var builder = WebApplication.CreateBuilder(args);
var timeStampInterceptor = new TimeStampInterceptor();
builder.Services.AddSingleton(timeStampInterceptor);

builder.Services
    .AddControllersWithViews()
    .AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

//Add AutoMapper DI
builder.Services.AddAutoMapper(typeof(Program).Assembly);

//Add service DI
builder.Services
    .AddScoped<IUserRepo, UserRepo>()
    .AddScoped<IUserService, UserService>()
    .AddScoped<IAuthService, AuthService>()
    .AddScoped<IProductRepo, ProductRepo>()
    .AddScoped<IProductService, ProductService>()
    .AddScoped<IOrderProduct, OrderProductRepo>()
    .AddScoped<IOrderProductService, OrderProductService>()
    .AddScoped<IOrderRepo, OrderRepo>()
    .AddScoped<IOrderService, OrderService>();

//Add DbContext
builder.Services.AddDbContext<DatabaseContext>(
    options =>
    {
        var npgsqlBuilder = new NpgsqlDataSourceBuilder(
            builder.Configuration.GetConnectionString("Default")
        );
        options.AddInterceptors(timeStampInterceptor);
        options.UseNpgsql(npgsqlBuilder.Build()).UseSnakeCaseNamingConvention();
        npgsqlBuilder.MapEnum<Role>();
        npgsqlBuilder.MapEnum<OrderStatus>();
    },
    ServiceLifetime.Scoped
);

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition(
        "oauth2",
        new OpenApiSecurityScheme
        {
            Description = "Bearer Token Identification",
            Name = "Authentication",
            In = ParameterLocation.Header
        }
    );
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "ecommerce-backend",
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(
                    "my-secret-key-the-secret-sauce-is-spaghetti-sauce-which-tastes-really-good"
                )
            ),
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        "EmailWhiteList",
        policy => policy.RequireClaim(ClaimTypes.Email, "admin@mail.com")
    );
});

builder.Services.Configure<RouteOptions>(options =>
{
    options.LowercaseUrls = true;
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "Policy1",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000");
        }
    );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("Policy1");
app.MapControllers();

app.Run();


// private static void ConfigureDbContextOptions(IServiceCollection services)
// {
//     services.AddDbContextPool<DatabaseContext>((serviceProvider, options) =>
//     {
//         var config = serviceProvider.GetRequiredService<IConfiguration>();
//         var connectionString = config.GetConnectionString("Default");

//         var npgsqlBuilder = new NpgsqlConnectionStringBuilder(connectionString);

//         options.UseNpgsql(npgsqlBuilder.ConnectionString);
//     });
// }
