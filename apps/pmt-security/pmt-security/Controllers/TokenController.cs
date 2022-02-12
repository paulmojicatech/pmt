using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pmt_security.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pmt_security.Controllers
{
    [Route("[controller]")]
    public class TokenController : ControllerBase
    {
        [HttpPost]
        [Route("token-with-creds")]
        public IActionResult GetTokenFromCredentials(UserDTO userDTO)
        {
          return BadRequest();
        }
    }
}

