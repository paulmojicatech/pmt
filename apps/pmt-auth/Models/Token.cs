using System;
namespace pmt_auth.Models
{
  public class Token
  {
    public string AccessToken { get; set; } = string.Empty;
    public DateTime IssueDate { get; set; } = DateTime.MinValue;
    public DateTime ExpiresDate { get; set; } = DateTime.MinValue;
    public string UserName { get; set; } = string.Empty;
    public string[]? Roles { get; set; }

  }
}

