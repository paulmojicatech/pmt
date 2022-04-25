using System;
namespace pmt_auth.Models
{
  public class GetTokenRequest
  {
    public string userName { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
  }
}

