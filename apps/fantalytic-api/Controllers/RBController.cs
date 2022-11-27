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
  public class RBController : Controller
  {
    private RBService _rbSvc;

    public RBController(FantalyticContext ctx)
    {
      _rbSvc = new RBService(ctx);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllRBs()
    {
      try
      {
        IEnumerable<RB> rbItems = await _rbSvc.GetRBs();
        RBHttpResponse rbs = new RBHttpResponse(rbItems);
        return Ok(rbs);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpPost]
    public async Task<IActionResult> AddRBs([FromBody] RBHttpRequest rbReq)
    {
      try
      {
        await _rbSvc.AddRBs(rbReq.Rbs);
        return Ok("Success");
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteRBs([FromBody] RBHttpDeleteRequest rbReq)
    {
      try
      {
        _rbSvc.DeleteRBs(rbReq.Year);
        return Ok("Success");
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }
  }
}

