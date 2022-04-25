using System;
namespace pmt_auth.Models
{
  public class AssignUserRequest
  {
    public string UserId { get; set; } = string.Empty;
    public IEnumerable<PmtSystem> System { get; set; } = new List<PmtSystem>();
  }

  public enum PmtSystem
  {
    ADMIN = 1,
    GROCERY_LIST_ORGANIZER
  }
}

