using System;
using System.Text.Json.Serialization;

namespace marvintherapy_api.Models
{
  public class AppointmentRequest
  {

    [JsonPropertyName("name")]
    public string name { get; set; }
    [JsonPropertyName("email")]
    public string email { get; set; }
    [JsonPropertyName("requestDate")]
    public string requestDate { get; set; }


  }

  public class AzureSendEmailBody
  {
    public string name { get; set; }
    public string email { get; set; }
    public string phone { get; set; }
    public string message { get; set; }
  }
}

