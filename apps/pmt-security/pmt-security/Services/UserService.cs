using System;
using pmt_security.Models;
using System.Security.Cryptography;
using pmt_security.Contexts;

namespace pmt_security.Services
{
  public class UserService
  {
    private UserContext _ctx;

    public UserService(UserContext ctx)
    {
      this._ctx = ctx;
    }

    public User GenerateUser(UserDTO userDTO)
    {
      try
      {
        using (var hmac = new HMACSHA512())
        {
          byte[] passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(userDTO.Password));
          byte[] passwordSalt = hmac.Key;
          User user = new User()
          {
            Id = Guid.NewGuid(),
            UserName = userDTO.UserName,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt,
            Email = userDTO.Email
          };
          this._ctx.Add(user);
          this._ctx.SaveChanges();
          return user;
        }
      }
      catch(Exception ex)
      {
        throw new Exception("User DTO", ex.InnerException);
      }
    }

    public IEnumerable<User> GetAllUsers()
    {
      return null;
    }

  }
}

