using System;
namespace pmt_security.Models
{
  public class UserDTO
  {
    public UserDTO()
    {
    }

    public string UserName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
  }
}

