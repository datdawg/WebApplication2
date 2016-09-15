using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class CategoriesController : ApiController
    {
        DataContext _db = new DataContext();

        [HttpGet]
        public List<Categories> GetAll()
        {
            var data = _db.Categories.OrderBy(p => p.Id).ToList();

            return data;
        }
    }
}
