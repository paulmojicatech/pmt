using System;
using System.Collections.Generic;
using System.Diagnostics;
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
  [Route("security/user")]
  public class UserController : Controller
  {
    private UserContext _ctx;

    public UserController(UserContext ctx)
    {
      _ctx = ctx;
    }

    [AllowAnonymous]
    [HttpPost]
    public IActionResult RegisterUser([FromBody] RegisterUserRequest userReq)
    {
      try
      {
        UserDTO user = new UserDTO
        {
          UserId = userReq.userId,
          FirstName = userReq.firstName,
          LastName = userReq.lastName,
          Password = userReq.password,
          Email = userReq.email
        };
        UserApi userSvc = new UserApi(_ctx);
        userSvc.RegisterUser(user);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
      return Ok();
    }
  }
}

