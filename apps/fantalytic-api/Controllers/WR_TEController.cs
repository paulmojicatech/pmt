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
  public class WR_TEController : Controller
  {

    private WR_TEService _svc;

    public WR_TEController(FantalyticContext ctx)
    {
      _svc = new WR_TEService(ctx);
    }

    [HttpGet]
    public async Task<IActionResult> GetReceivingStats()
    {
      try
      {
        IEnumerable<WR_TE> recs = await _svc.GetWRTEs();
        WR_TEHttpResponse res = new WR_TEHttpResponse(recs);
        return Ok(res);

      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }


    [HttpPost]
    public async Task<IActionResult> AddReceivingStats([FromBody] WR_TEHttpRequest RecReq)
    {
      try
      {
        await _svc.AddWRTEs(RecReq.Receivers);
        return Ok("Success");
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteReceivers([FromBody] WR_TEHttpDeleteRequest req)
    {
      try
      {
        _svc.DeleteWRTEs(req.Year);
        return Ok("Success");
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

  }
}

