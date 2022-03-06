using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using marvintherapy_api.Models;
using marvintherapy_api.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace marvintherapy_api.Controllers
{
  [Route("api/[controller]")]
  public class AppointmentsController : ControllerBase
  {

    private EmailApi _emailSvc;
    private IConfiguration _config;
    public AppointmentsController(IConfiguration configuration)
    {
      IConfigurationSection emailSection = configuration.GetSection("EmailSettings");
      _emailSvc = new EmailApi(emailSection["SMTP_CLIENT"], emailSection["SMTP_EMAIL"], emailSection["SMTP_PASSWORD"], Convert.ToInt16(emailSection["SMTP_PORT"]));
      _config = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableAppointments()
    {
      return Ok("Healh check");
    }

    [HttpPost]
    public async Task<IActionResult> RequestAnAppointment([FromBody] AppointmentRequest newRequest)
    {
      try
      {

        string[] to = new string[] { _config.GetSection("EmailSettings")["SMTP_EMAIL"], _config.GetSection("EmailSettings")["SMTP_ADMIN"] };
        string body = $"New Appointment Request from {newRequest.name} with email address {newRequest.email} for the requested date {newRequest.requestDate}";
        object jsonObj = new AzureSendEmailBody
        {
          name = newRequest.name,
          phone = string.Empty,
          email = newRequest.email,
          message = body
        };
        HttpClient httpAzureClient = new HttpClient();
        using StringContent json = new(
        JsonSerializer.Serialize(jsonObj),
        Encoding.UTF8,
        MediaTypeNames.Application.Json);
        await httpAzureClient.PostAsync(_config.GetSection("AzureFunctionEndpoints")["SendManualEmail"], json);
        return Ok();
      }
      catch (Exception ex)
      {
        return StatusCode(500);
      }
      return BadRequest();
    }
  }
}

