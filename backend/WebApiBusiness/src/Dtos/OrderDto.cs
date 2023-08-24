using WebApiDomain.Entities;

namespace WebApiBusiness.Dtos;

  public class OrderReadDto
  {
    public float Price { get; set; }
    public string Description { get; set; }
    public List<string> Images { get; set; }
    public Guid UserId { get; set; }
    public OrderStatus Status { get; set; }
  }

  public class OrderCreateDto
  {
    public float Price { get; set; }
    public string Description { get; set; }
    public List<string> Images { get; set; }
  }

  public class OrderCreateWithIdDto
  {
    public float Price { get; set; }
    public string Description { get; set; }
    public List<string> Images { get; set; }
    public Guid UserId { get; set; }
    public OrderStatus Status { get; set; }

  }

  public class OrderUpdateDto
  {
    public float Price { get; set; }
    public string Description { get; set; }
    public List<string> Images { get; set; }
  }

