using System.Text.Json.Serialization;

namespace WebApiDomain.Entities;

public class Order : BaseEntityWithId
{
    public OrderStatus Status { get; set; }
    public User User { get; set; }
    public List<OrderProducts> OrderProducts { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum OrderStatus
{
    Shipped,
    Processing
}