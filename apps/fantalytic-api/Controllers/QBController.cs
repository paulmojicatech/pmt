using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pmt.FantalyticApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pmt.FantalyticApi.Controllers
{
  [Route("api/[controller]")]
  public class QBController : Controller
  {
    [HttpGet]
    public async Task<IActionResult> GetAllQBs()
    {
      return Ok("Yay");
    }

    [HttpPost]
    public async Task<IActionResult> AddQBs([FromBody] IEnumerable<QB> qbs)
    {

      return BadRequest();
    }
  }
}

