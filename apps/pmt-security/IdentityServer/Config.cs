using System;
using Duende.IdentityServer.Models;

namespace IdentityServer
{
  public static class Config
  {

    public static IEnumerable<ApiScope> ApiScopes =>
      new List<ApiScope>
      {
        new ApiScope("UserAPI", "User Managment API")
      };

    public static IEnumerable<Client> Clients =>
      new List<Client>
      {
        new Client
        {
          ClientId = "UsersAPI",
          AllowedGrantTypes = GrantTypes.ClientCredentials,
          ClientSecrets = {
            new Secret("secret".Sha256())
          },
          AllowedScopes = { "UsersAPI" }
        }
      };

  }
}

