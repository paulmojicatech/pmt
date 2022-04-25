using System;
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
      User? user = _ctx.Users?.FirstOrDefault(u => u.UserId.ToLower() == userName.ToLower() && u.IsActive);

      if (user != null)
      {
        IEnumerable<UserRoles> userRoles = _ctx.UserRoles?.Where(ur => ur.UserId == user.UserId).ToList() ?? new List<UserRoles>();

        foreach (UserRoles ur in userRoles)
        {
          Role? role = _ctx.Roles?.FirstOrDefault(r => r.RoleId == ur.RoleId);
          if (role != null && !user.Roles.Exists(r => r.RoleId == role.RoleId))
          {
            user.Roles.Add(role);
          }

        }
      }
      return user;

    }

    public void AssignUserRole(User user, PmtSystem system)
    {
      try
      {
        Role? role = _ctx.Roles?.FirstOrDefault(r => r.RoleId == (int)system);
        if (role == null)
        {
          throw new Exception("Not Found");
        }
        bool doesRoleExist = user.Roles?.Exists(r => r.RoleId == role?.RoleId) ?? false;
        if (!doesRoleExist)
        {
          var userRoles = user.Roles ?? new List<Role>();
          userRoles.Add(role);
          user.Roles = userRoles;
          _ctx.Update(user);
          _ctx.SaveChanges();
        }
      }
      catch
      {
        throw;
      }
    }


  }
}

