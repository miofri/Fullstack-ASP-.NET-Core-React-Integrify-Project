namespace WebApiDomain.Entities;

public class OrderProducts : BaseEntity
{
    public Order Order { get; set; }
    public Product Product { get; set; }
    public int Amount { get; set; }
}
