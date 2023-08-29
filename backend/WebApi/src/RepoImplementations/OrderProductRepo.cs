using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApi.RepoImplementations;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApi.src.RepoImplementations;

public class OrderProductRepo : BaseRepo<OrderProducts>, IOrderProduct
{
    private readonly DbSet<OrderProducts> _orderProduct;
    private readonly DatabaseContext _context;

    public OrderProductRepo(DatabaseContext dbContext)
        : base(dbContext)
    {
        _orderProduct = dbContext.OrderProducts;
        _context = dbContext;
    }

    public async Task AddOrderProductsToOrder(Order order)
    {
        var orderProducts = order.OrderProducts;
        foreach (var product in orderProducts)
        {
            await _orderProduct.AddAsync(product);
        }
        await _context.SaveChangesAsync();
    }
}
