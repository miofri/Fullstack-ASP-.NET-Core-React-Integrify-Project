
namespace WebApiDomain.Entities;

public class Product : BaseEntityWithId
{
    public string Name { get; set; }
    public float Price { get; set; }
    public string Description { get; set; }
    public List<string> Images { get; set; }
    public int Inventory { get; set; }
}