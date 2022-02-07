using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pmt_security.Models
{
  [Table("Users")]
  public class User
  {
    [Key]
    [Column("Id")]
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public byte[]? PasswordHash { get; set; }
    public byte[]? PasswordSalt { get; set; }


  }
}

