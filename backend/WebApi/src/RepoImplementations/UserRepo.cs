using Microsoft.EntityFrameworkCore;
using WebApi.Database;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApi.RepoImplementations;

public class UserRepo : BaseRepo<User>, IUserRepo
{
    private readonly DbSet<User> _users;
    private readonly DatabaseContext _context;

    public UserRepo(DatabaseContext dbContext)
        : base(dbContext)
    {
        _users = dbContext.Users;
        _context = dbContext;
    }

    public async Task<User> CreateAdmin(User user)
    {
        user.Role = Role.Admin;
        await _users.AddAsync(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User?> FindOneByEmail(string email)
    {
        return await _users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User> UpdatePassword(User user)
    {
        _users.Update(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public override Task<User> CreateOne(User entity)
    {
        entity.Role = Role.User;
        return base.CreateOne(entity);
    }
}
