using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApi.RepoImplementations;

public class OrderRepo : BaseRepo<Order>, IOrderRepo
{
    private readonly DbSet<Order> _order;
    private readonly DatabaseContext _context;

    public OrderRepo(DatabaseContext dbContext)
        : base(dbContext)
    {
        _order = dbContext.Orders;
        _context = dbContext;
    }

    public async Task<Order> CreateOneOrder(Order entity)
    {
        await _order.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<List<Order>> GetOrderByUserIdAsync(Guid id)
    {
        var orders = await _order.Where(entity => entity.UserId == id).ToListAsync();

        return orders;
    }
}
