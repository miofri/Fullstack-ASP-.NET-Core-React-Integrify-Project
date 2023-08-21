using WebApiBusiness.Dtos;

namespace WebApiBusiness.Abstraction{

public interface IAuthService
{
	Task<string> VerifyCredentials(UserCredentialsDto credentials);
}};