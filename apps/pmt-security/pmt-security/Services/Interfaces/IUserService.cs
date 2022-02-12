using System;
using pmt_security.Models;

namespace pmt_security.Services.Interfaces
{
  public interface IUserService
  {
    User GenerateUser(UserDTO userDTO);
    IEnumerable<User>? GetAllUsers();
  }
}

