using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication2.Models;
using System.Data.Entity;

namespace WebApplication2.Controllers
{
    public class EventsController : ApiController
    {
        DataContext _db = new DataContext();

        [HttpGet]
        public List<Events> GetAll()
        {
            var data = _db.Events.Include(p => p.Location).Include(p => p.Media).Include(p => p.Categories).OrderBy(p => p.Id).ToList();

            return data;
        }

        [HttpGet]
        [Route("api/events/{Id}")]
        public Events GetById(int Id)
        {
            Events ev = _db.Events.Include(p => p.Location).Include(p => p.Media).Include(p => p.Categories).OrderBy(p => p.Id).Where(p => p.Id == Id).FirstOrDefault();

            return ev;
        }

        [HttpGet]
        [Route("api/events/search")]
        public List<Events> Search(string s = "", string categories = "")
        {
            if(categories == null)
            {
                categories = "";
            }
            string[] arrCats = { };
            if (categories != "")
            {
                arrCats = categories.TrimEnd(',').Split(',');
            }

            var data = _db.Events.Include(p => p.Location).Include(p => p.Media).Include(p => p.Categories).OrderBy(p => p.Id).Where(
                p => p.Name.Contains(s) ||
                p.Description.Contains(s) ||
                s == null &&
                arrCats.Contains(p.FK_Category.ToString())).ToList();

            return data;
        }
    }
}
