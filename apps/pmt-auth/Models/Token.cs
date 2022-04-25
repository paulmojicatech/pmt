using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pmt_auth.Models
{
  public class Token
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public string AccessToken { get; set; } = string.Empty;
    [Required]
    public string UserName { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public DateTime? LastLogin { get; set; }

  }
}

