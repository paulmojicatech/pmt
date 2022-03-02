using System;
namespace marvintherapy_api.Services.Interfaces
{
  public interface IEmailService
  {
    void SendEmail(string[] to, string subject, string message);
  }
}

