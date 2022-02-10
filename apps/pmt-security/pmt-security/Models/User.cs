using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace pmt_security.Models
{
  [Table("Users")]
  [Index(nameof(UserName), IsUnique = true)]
  [Index(nameof(Email), IsUnique = true)]
  public class User
  {
    [Key]
    [Column("Id")]
    public Guid Id { get; set; }
    [Required]
    public string UserName { get; set; } = string.Empty;

    [Required]
    public string Email { get;set; } = string.Empty;

    [Required]
    public byte[]? PasswordHash { get; set; }

    [Required]
    public byte[]? PasswordSalt { get; set; }

    public bool IsActive {get;set;} = false;


  }
}

