namespace WebApiBusiness.Dtos;

public class UserReadDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Avatar { get; set; }
    public string Address { get; set; }
}

public class UserCreateDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string UserName { get; set; }
    public string Avatar { get; set; }
    public string Address { get; set; }
    public string Password { get; set; }
}

public class UserUpdateDto
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Avatar { get; set; }
    public string Address { get; set; }
}

public class UserCredentialsDto
{
    public string Email { get; set; }
    public string Password { get; set; }
}
