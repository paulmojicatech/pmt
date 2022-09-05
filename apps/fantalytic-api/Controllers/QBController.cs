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
  public class QBController : Controller
  {

    private QBService _qbSvc;

    public QBController(QBContext ctx)
    {
      _qbSvc = new QBService(ctx);
    }

    [HttpGet]
    public async Task<IActionResult> GetAllQBs()
    {

      try
      {
        IEnumerable<QB> qbs = await _qbSvc.GetQBs();
        return Ok(qbs);
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }
    }

    [HttpPost]
    public async Task<IActionResult> AddQBs([FromBody] IEnumerable<QB> qbs)
    {
      try
      {
        await _qbSvc.AddQBs(qbs);
        return Ok("Success");
      }
      catch (Exception ex)
      {
        return BadRequest(ex);
      }

    }
  }
}

