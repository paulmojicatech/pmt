using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pmt_security.Contexts;
using pmt_security.Models;
using pmt_security.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pmt_security.Controllers
{
  public class UserController : ControllerBase
  {
    private UserContext _ctx;
    public UserController(UserContext ctx)
    {
      _ctx = ctx;
    }

    [Authorize]
    [Route("user")]
    [HttpGet]
    public IActionResult GetUsers()
    {

      return BadRequest();
    }



    [Route("user")]
    [HttpPost]
    public IActionResult RegisterUser(UserDTO userDTO)
    {
      UserService service;
      try
      {
        service = new UserService(_ctx);
        User user = service.GenerateUser(userDTO);
        return Ok(user);
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

    }
  }
}

