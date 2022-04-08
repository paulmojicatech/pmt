using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pmt_auth.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pmt_auth.Controllers
{
  [Route("security/[controller]")]
  public class UserController : Controller
  {
    [AllowAnonymous]
    [HttpPost]
    public IActionResult RegisterUser(User userReq)
    {
      try
      {

      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
      return Ok();
    }
  }
}

