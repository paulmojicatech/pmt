using System;
namespace pmt_auth.Models
{
  public class UserDTO
  {
    public string UserId { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
  }
}

