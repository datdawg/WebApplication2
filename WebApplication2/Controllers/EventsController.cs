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
            if (categories == null)
            {
                categories = "";
            }
            string[] arrCats = { };
            if (categories != "")
            {
                arrCats = categories.TrimEnd(',').Split(',');
            }

            if (s == "")
            {
                s = null;
            }

            var Eventlist = _db.Events.Include(p => p.Location).Include(p => p.Media).Include(p => p.Categories).OrderBy(p => p.Id);
            var data = new List<Events>();
            //if there is no search parameter or categories chosen: return all events.
            if (s == null && arrCats.Length == 0)
            {
                data = Eventlist.ToList();
            }
            //if there is no search parameter but at least one category is chosen: return all from chosen categories.
            else if (s == null && arrCats.Length > 0)
            {
                data = Eventlist.Where(p =>
                arrCats.Contains(p.FK_Category.ToString())
                ).ToList();
            }
            //if there is a search parameter but no categories are chosen: return all parameter matches from all categories.
            else if (s != null && arrCats.Length == 0)
            {
                data = Eventlist.Where(p =>
                p.Name.Contains(s) ||
                p.Description.Contains(s) ||
                p.Location.City.Contains(s) ||
                p.Location.Zipcode.ToString().Contains(s)
                ).ToList();
            }
            //if there is a search parameter and at least one category is chosen: return all parameter matches from chosen categories.
            else if (s != null && arrCats.Length > 0)
            {
                data = Eventlist.Where(p =>
                p.Name.Contains(s) ||
                p.Description.Contains(s) ||
                p.Location.City.Contains(s) ||
                p.Location.Zipcode.ToString().Contains(s) &&
                arrCats.Contains(p.FK_Category.ToString())
                ).ToList();
            }

            return data;
        }
    }
}
