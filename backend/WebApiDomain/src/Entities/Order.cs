namespace WebApiDomain.Entities;

public class Order : BaseEntityWithId
{
    public OrderStatus Status { get; set; }
    public User User { get; set; }
    public int TotalAmount { get; set; }
    public List<OrderProducts> OrderProducts { get; set; }
}

public enum OrderStatus
{
    Shipped,
    Processing
}