using System;
namespace pmt_auth.Models
{
  public class RegisterUserRequest
  {
    public string userId { get; set; } = string.Empty;
    public string password { get; set; } = string.Empty;
    public string firstName { get; set; } = string.Empty;
    public string lastName { get; set; } = string.Empty;
    public string email { get; set; } = string.Empty;
  }
}

