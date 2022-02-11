using System;
using pmt_security.Models;
using System.Security.Cryptography;
using pmt_security.Contexts;
using pmt_security.Services.Interfaces;

namespace pmt_security.Services
{
  public class UserService : IUserService
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
        byte[] passwordHash = Util.GenerateHash(userDTO.Password);
        User user = new User()
        {
          Id = Guid.NewGuid(),
          UserName = userDTO.UserName,
          PasswordHash = passwordHash,
          Email = userDTO.Email
        };
        this._ctx.Add(user);
        this._ctx.SaveChanges();
        return user;
        
      }
      catch(Exception ex)
      {
        throw new Exception("User DTO", ex.InnerException);
      }
    }

    public IEnumerable<User>? GetAllUsers() => _ctx.Users;

  }
}

