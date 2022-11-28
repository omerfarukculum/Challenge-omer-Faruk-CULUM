using C.DataAccess;
using C.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace C.UI.Controllers
{
    public class SessionController : Controller
    {
        // GET: Session
        CDBContext db = new CDBContext();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult SignIn(User user)
        {
            User currentUser = db.Users.Where(x=>x.UserName == user.UserName && x.Password == user.Password).FirstOrDefault();
            if (currentUser == null)
            {
                return RedirectToAction("Index", "Home");
            }
            else
            {
                return RedirectToAction("Index", "Session");
            }
           
        }
    }
}