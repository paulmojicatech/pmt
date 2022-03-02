using System;
namespace marvintherapy_api.DataAccess
{
  public interface IDBAdapter
  {
    object GetOne(string id);
    IEnumerable<object> GetMany();
  }
}

