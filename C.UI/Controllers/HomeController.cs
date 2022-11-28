using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace C.UI.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
       
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ListFilm()
        {
            return View();
        }
        public ActionResult InsertFilm()
        {
            return View();
        }
        public ActionResult DeleteFilm()
        {
            return View();
        }
        public ActionResult UpdateFilm()
        {
            return View();
        }
        public ActionResult Search()
        {
            return View();
        }

    }
}