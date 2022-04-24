using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Services;
using pmt_auth.Util;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pmt_auth.Controllers
{
  [Route("security/[controller]")]
  public class TokenController : Controller
  {
    private UserContext _ctx;

    public TokenController(UserContext ctx)
    {
      _ctx = ctx;
    }

    [HttpPost]
    [AllowAnonymous]
    public IActionResult GenerateAccessToken([FromBody] GetTokenRequest req)
    {
      if (string.IsNullOrEmpty(req.userName) || string.IsNullOrEmpty(req.password))
      {
        return BadRequest("User Name and Password are required");
      }
      UserApi userSvc = new UserApi(_ctx);
      try
      {
        User? user = userSvc.GetUser(req.userName);
        if (user == null)
        {
          return StatusCode(StatusCodes.Status404NotFound);
        }

        TokenApi tokenSvc = new TokenApi(_ctx);
        Token token = tokenSvc.CreateAccessToken(user, req.password);
        return Ok(token);
      }
      catch (Exception ex)
      {
        if (ex.Message == "401")
        {
          return StatusCode(StatusCodes.Status401Unauthorized);
        }
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
    }
  }
}

