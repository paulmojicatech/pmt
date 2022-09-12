using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pmt.FantalyticApi.Models;
using Pmt.FantalyticApi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pmt.FantalyticApi.Controllers
{
  [Route("api/[controller]")]
  public class DefenseController : Controller
  {

    private DefenseService _svc;

    public DefenseController(FantalyticContext ctx)
    {
      _svc = new DefenseService(ctx);
    }

    [HttpGet]
    public async Task<IActionResult> GetDefenses()
    {
      try
      {
        IEnumerable<Defense> defs = await _svc.GetDefenses();
        DefenseHttpResponse resp = new DefenseHttpResponse(defs);
        return Ok(resp);

      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpPost]
    public async Task<IActionResult> AddDefenses([FromBody] DefenseHttpRequest req)
    {
      try
      {
        await _svc.AddDefenses(req.Defenses);
        return Ok("Success");
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
  }
}

