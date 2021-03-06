using System;
using System.ComponentModel.DataAnnotations;

namespace pmt_auth.Models
{
  public class User
  {
    [Key]
    [Required]
    public string UserId { get; set; } = string.Empty;
    [Required]
    public string Password { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsActive { get; set; } = false;
    public List<Role> Roles { get; set; } = new List<Role>();
  }

  public class UserRoles
  {
    [Required]
    public string UserId { get; set; } = string.Empty;
    [Required]
    public int RoleId { get; set; } = int.MinValue;
  }
}

