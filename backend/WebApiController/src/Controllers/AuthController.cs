using Microsoft.AspNetCore.Mvc;
using WebApiBusiness.Abstraction;
using WebApiBusiness.Dtos;

namespace WebApiController.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly IAuthService _authService;
  public AuthController(IAuthService authService)
  {
    _authService = authService;
  }
  [HttpPost]
  public async Task<ActionResult<string>> VerifyCredentials([FromBody] UserCredentialsDto credentials)
  {
    return Ok(await _authService.VerifyCredentials(credentials));
  }
}
