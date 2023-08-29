using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApiBusiness.Dtos;

public class OrderProductReadDto
{
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public int Amount { get; set; }
}

public class OrderProductCreateDto
{
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public int Amount { get; set; }
}

public class OrderProductUpdateDto
{
    public Guid OrderId { get; set; }
    public Guid ProductId { get; set; }
    public int Amount { get; set; }
}
