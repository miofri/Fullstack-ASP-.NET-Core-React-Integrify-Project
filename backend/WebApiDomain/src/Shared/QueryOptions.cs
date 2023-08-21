namespace WebApiDomain.Shared;

public class QueryOptions
{
    public string Search { get; set; } = string.Empty;
    public string Order { get; set; } = "UpdatedAt";
    public bool OrderByDescending { get; set; } = false;
    public int PageNumber { get; set; } = 1;
    public int ItemPerPage { get; set; } = 10;
}