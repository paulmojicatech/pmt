using System;

namespace marvintherapy_api.DataAccess
{
  public class MongoDBAdapter : IDBAdapter
  {
    public MongoDBAdapter()
    {
    }

    public IEnumerable<object> GetMany()
    {
      throw new NotImplementedException();
    }

    public object GetOne(string id)
    {
      throw new NotImplementedException();
    }
  }
}

