using System;
using System.Security.Cryptography;
using System.Text;

namespace pmt_auth.Util
{
  public static class HashUtil
  {
    public static void GenerateHash(string valueToHash, out byte[] passwordHash)
    {
      using (var hmac = new HMACSHA512())
      {
        passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(valueToHash));
      }
    }

    public static bool CompareHash(string persistedValue, string valueToValidate)
    {
      GenerateHash(valueToValidate, out byte[] hashToCompare);
      string password = BitConverter.ToString(hashToCompare);
      return persistedValue == password;
    }

  }
}

