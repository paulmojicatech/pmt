using System;
using pmt_security.Models;
using System.Security.Cryptography;
using pmt_security.Contexts;

namespace pmt_security.Services
{
  public class UserService
  {

    private UserDTO _userDTO;
   

    public UserService(UserDTO userDTO)
    {
      this._userDTO = userDTO;
    }

    public User GenerateUser()
    {
      using (var hmac = new HMACSHA512())
      {
        byte[] passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(this._userDTO.Password));
        byte[] passwordSalt = hmac.Key;
        return new User()
        {
          Id = Guid.NewGuid(),
          UserName = this._userDTO.UserName,
          PasswordHash = passwordHash,
          PasswordSalt = passwordSalt
        };
      }
    }

  }
}

