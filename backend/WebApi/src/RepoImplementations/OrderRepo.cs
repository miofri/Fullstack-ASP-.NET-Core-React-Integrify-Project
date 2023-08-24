using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApi.RepoImplementations;

public class OrderRepo: BaseRepo<Order>, IOrderRepo
{
  
  private readonly DbSet<Order> _order;
  private readonly DatabaseContext _context;
  
  public OrderRepo(DatabaseContext dbContext) : base(dbContext)
  {
    _order = dbContext.Orders;
    _context = dbContext;
  }
  public override Task<Order> CreateOne(Order entity)
  {
    entity.Status = OrderStatus.Processing;
    return base.CreateOne(entity);
  }
}

