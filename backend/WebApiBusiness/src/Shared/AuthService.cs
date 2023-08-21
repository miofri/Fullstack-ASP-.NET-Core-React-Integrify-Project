using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;
using WebApiDomain.Abstractions;
using WebApiDomain.Entities;

namespace WebApiBusiness.Shared;

public class AuthService : IAuthService
{
	private readonly IUserRepo _userRepo;

	public AuthService(IUserRepo userRepo)
	{
		_userRepo = userRepo;
	}

	public async Task<string> VerifyCredentials(UserCredentialsDto credentials)
	{
		var foundUserByEmail = await _userRepo.FindOneByEmail(credentials.Email);
		if (foundUserByEmail == null)
		{
			throw new Exception("Email not found");
		}
		var isAuthenticated = PasswordService.VerifyPassword(credentials.Password,
			foundUserByEmail.Password, foundUserByEmail.Salt);
		if (!isAuthenticated)
		{
			throw new Exception("Credentials do not match");
		}

		return GenerateToken(foundUserByEmail);
	}

	private string GenerateToken(User user)
	{
		var claims = new List<Claim>
		{
			new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new Claim(ClaimTypes.Role, user.Role.ToString())
		};
		var securityKey =
			new SymmetricSecurityKey(
				Encoding.UTF8.GetBytes("my-secret-key-the-secret-sauce-is-spaghetti-sauce-which-tastes-really-good"));
		var securityCredential = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
		var securityTokenDescriptor = new SecurityTokenDescriptor
		{
			Issuer = "ecommerce-backend",
			Expires = DateTime.Now.AddMinutes(10),
			Subject = new ClaimsIdentity(claims),
			SigningCredentials = securityCredential
		};
		var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
		var token = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
		return jwtSecurityTokenHandler.WriteToken(token);
	}
}