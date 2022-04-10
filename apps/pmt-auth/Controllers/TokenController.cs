using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pmt_auth.Controllers
{
  [Route("security/[controller]")]
  public class TokenController : Controller
  {
    private UserContext _userCtx;
    private TokenContext _tokenCtx;

    public TokenController(UserContext userCtx, TokenContext tokenCtx)
    {
      _userCtx = userCtx;
      _tokenCtx = tokenCtx;
    }

    [HttpPost]
    [AllowAnonymous]
    public IActionResult GenerateAccessToken(GetTokenRequest req)
    {
      if (string.IsNullOrEmpty(req.userName) || string.IsNullOrEmpty(req.password))
      {
        return BadRequest();
      }
      UserApi userSvc = new UserApi(_userCtx);
      User? user = userSvc.GetUser(req.userName);
      if (user == null)
      {
        return BadRequest();
      }

      return BadRequest();
    }
  }
}

