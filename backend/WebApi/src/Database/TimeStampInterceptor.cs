using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using WebApiDomain.Entities;

namespace WebApi.Database;

public class TimeStampInterceptor : SaveChangesInterceptor
{
  public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData,
    InterceptionResult<int> result, CancellationToken cancellationToken)
  {
    var addedEntries = eventData.Context.ChangeTracker.Entries().Where(e => e.State == EntityState.Added);
    foreach (var trackEntry in addedEntries)
    {
      if (trackEntry.Entity is BaseEntity entity)
      {
        entity.CreatedAt = DateTime.Now;
        entity.UpdatedAt = DateTime.Now;
      }
    }
    
    var updatedEntries = eventData.Context.ChangeTracker.Entries().Where(e => e.State == EntityState.Modified);
    foreach (var trackEntry in updatedEntries)
    {
      if (trackEntry.Entity is BaseEntity entity)
      {
        entity.UpdatedAt = DateTime.Now;
      }
    }
    return base.SavingChangesAsync(eventData, result, cancellationToken);
    
  }
}
