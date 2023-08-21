namespace WebApiBusiness.Dtos
{
    public class ProductReadDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public List<string> Images { get; set; }
    }

    public class ProductCreateDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public List<string> Images { get; set; }
        public int Inventory {get; set; }
    }

    public class ProductUpdateDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public List<string> Images { get; set; }
        public int Inventory {get; set; }
    }
}
