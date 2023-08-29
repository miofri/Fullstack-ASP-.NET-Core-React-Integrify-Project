using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApi.RepoImplementations;

public class ProductRepo : BaseRepo<Product>, IProductRepo
{
    private readonly DbSet<Product> _products;
    private readonly DatabaseContext _context;

    public ProductRepo(DatabaseContext dbContext)
        : base(dbContext)
    {
        _products = dbContext.Products;
        _context = dbContext;
    }

    public virtual async Task<List<Product>> GetFiltered(List<Guid> ids)
    {
        return await _products.Where(entity => ids.Contains(entity.Id)).ToListAsync();
    }
}
