using System;
using pmt_auth.Contexts;
using pmt_auth.Models;
using pmt_auth.Util;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace pmt_auth.Services
{
  public class TokenApi
  {
    private UserContext _ctx;
    private IConfiguration _config;

    public TokenApi(UserContext ctx, IConfiguration config)
    {
      _ctx = ctx;
      _config = config;
    }

    public Token CreateAccessToken(User userToValidate, string passwordToValidate)
    {
      Token tokenToReturn;
      try
      {
        bool isValid = passwordToValidate == userToValidate.Password && userToValidate.Roles?.Count > 0;
        if (isValid)
        {
          List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userToValidate.UserId)
            };

          userToValidate.Roles?.ForEach(r => claims.Add(new Claim(ClaimTypes.Role, r.RoleName)));

          SymmetricSecurityKey jwtKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config.GetSection("jwtKey").Value));
          var creds = new SigningCredentials(jwtKey, SecurityAlgorithms.HmacSha512Signature);

          JwtSecurityToken token = new JwtSecurityToken(
              claims: claims,
              expires: DateTime.Now.AddDays(60),
              signingCredentials: creds);

          var jwt = new JwtSecurityTokenHandler().WriteToken(token);
          tokenToReturn = new Token
          {
            AccessToken = jwt,
            UserName = userToValidate.UserId,
            FirstName = userToValidate.FirstName,
            LastLogin = DateTime.UtcNow
          };
          _ctx.Add(tokenToReturn);
          _ctx.SaveChanges();
          return tokenToReturn;
        }
        throw new Exception("401");
      }
      catch
      {
        throw;
      }

    }

  }
}


