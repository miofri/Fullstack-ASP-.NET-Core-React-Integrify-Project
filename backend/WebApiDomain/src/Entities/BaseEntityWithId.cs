namespace WebApiDomain.Entities;

public class BaseEntityWithId : BaseEntity
{
    public Guid Id { get; set; }
}