using System;
using System.Security.Cryptography;
using System.Text;

namespace pmt_auth.Util
{
  public static class HashUtil
  {
    static HMACSHA512 hmac = new HMACSHA512();

    public static void GenerateHash(string valueToHash, out byte[] passwordHash, out byte[] passwordSalt)
    {

      passwordSalt = hmac.Key;
      passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(valueToHash));

    }

    public static bool CompareHash(string plainText, string persistedValue)
    {

      byte[] password = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(plainText));
      string passwordToValidate = Convert.ToBase64String(password);
      return persistedValue == passwordToValidate;

    }

  }
}

