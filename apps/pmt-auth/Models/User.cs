using System;
using System.ComponentModel.DataAnnotations;

namespace pmt_auth.Models
{
  public class User
  {
    [Required]
    public string UserName { get; set; } = string.Empty;
    [Required]
    public byte[] PasswordHash { get; set; } = new byte[0];
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
  }
}

