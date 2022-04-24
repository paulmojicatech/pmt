﻿using System;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Util;

namespace pmt_auth.Services
{
  public class UserApi
  {

    private UserContext _ctx;

    public UserApi(UserContext ctx)
    {
      _ctx = ctx;
    }

    public void RegisterUser(UserDTO user)
    {
      try
      {
        // HashUtil.GenerateHash(user.Password, out byte[] hashedPassword, out byte[] passwordSalt);
        User userInstance = new User
        {
          FirstName = user.FirstName,
          LastName = user.LastName,
          UserId = user.UserId,
          Email = user.Email,
          Password = user.Password
        };
        _ctx.Add(userInstance);
        _ctx.SaveChanges();
      }
      catch
      {
        throw;
      }
    }

    public User? GetUser(string userName)
    {
      return _ctx.Users.FirstOrDefault(u => u.UserId.ToLower() == userName.ToLower() && u.IsActive);
    }


  }
}

