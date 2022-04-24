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
    public DateTime IssueDate { get; set; } = DateTime.MinValue;
    [Required]
    public DateTime ExpiresDate { get; set; } = DateTime.MinValue;
    public string UserName { get; set; } = string.Empty;
    public List<Role>? Roles { get; set; }
    public DateTime? LastLogin { get; set; }

  }
}

