using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pmt_security.Models;
using pmt_security.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pmt_security.Controllers
{
    public class UserController : Controller
    {
        [Route("user")]
        [HttpPost]
        public IActionResult RegisterUser(UserDTO userDTO)
        {
            UserService service = new UserService(userDTO);
            User user = service.GenerateUser();
            return Ok(user);
        }
    }
}

