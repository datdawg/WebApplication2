using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class EventController : Controller
    {
        // GET: Event
        public ActionResult Index(int? iEventID)
        {
            if (!iEventID.HasValue)
            {
                return RedirectToAction("Index", "Home");
            }

            return View(iEventID);
        }
    }
}