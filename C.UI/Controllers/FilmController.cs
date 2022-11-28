using C.DataAccess;
using C.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace C.UI.Controllers
{
    public class FilmController : Controller
    {
        // GET: Film
        CDBContext db = new CDBContext();
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult InsertFilm(Film film)
        {
            Film newFilm = new Film()
            {
                filmAd = film.filmAd,
                filmYapimYil = film.filmYapimYil,

            };
            db.Films.Add(newFilm);
            db.SaveChanges();
            return View();
        }
        public JsonResult GetFilms()
        {
            var Films = db.Films.ToList();
            return Json(
                new
                {
                    Result = from obj in Films
                             select new
                             {
                                 obj.Id,
                                 obj.filmAd,
                                 obj.filmYapimYil,


                             }
                }, JsonRequestBehavior.AllowGet
                );


        }
        [HttpPost]
        public ActionResult DeleteFilm(int id)
        {
            Film WillDeleteFilm = db.Films.Find(id);
            if (WillDeleteFilm != null)
            {
                db.Films.Remove(WillDeleteFilm);
                db.SaveChanges();
            }

            return View();
        }
        [HttpPost]
        public ActionResult UpdateFilm(Film film)
        {
            Film UpdateFilm = db.Films.Find(film.Id);
            if (UpdateFilm != null)
            {
                UpdateFilm.filmAd = film.filmAd;
                UpdateFilm.filmYapimYil = film.filmYapimYil;
                db.SaveChanges();
            }


            return RedirectToAction("UpdateFilm","Home");
        }
        [HttpGet]
        public JsonResult GetIdFilm(int id)
        {
            var Film = db.Films.Find(id);
            return Json(
                new
                {
                    Result = Film
                        
                }, JsonRequestBehavior.AllowGet
                );


        }
        public JsonResult GetSalon()
        {
            var Salons = db.Salons.ToList();
            return Json(
                new
                {
                    Result = from obj in Salons
                             select new
                             {
                                 obj.Id,
                                 obj.salonAd,
                             


                             }
                }, JsonRequestBehavior.AllowGet
                );


        }
        [HttpGet] 
        public JsonResult GetSalonIdFilms(int id)
        {
         
            return Json(
                   new
                   {
                       Result = from post in db.Salons
                                join meta in db.SalonFilms
                                on post.Id equals meta.SalonId
                                where meta.SalonId == id
                                select new
                                {
                                    filmAd = meta.Film.filmAd,
                                    filmYapimYil = meta.Film.filmYapimYil,
                                }
                   }, JsonRequestBehavior.AllowGet
                   );


        }
        [HttpGet] 
        public JsonResult GetFilmIdSalons(int id)
        {
            Film getfilm = db.Films.Find(id);

       
            return Json(
                new
                {
                    Result = from post in db.Films
                             join meta in db.SalonFilms
                             on post.Id equals meta.FilmId
                               where meta.FilmId == id
                             select new
                             {
                                  salonAd = meta.Salon.salonAd,
                                  gosterimYil = meta.gosterimYil,
                             }
                }, JsonRequestBehavior.AllowGet
                );


        }


        [HttpGet]
        public JsonResult Getyapimyil(string param2, string param1)
        {
           
            var xyapimyil = Convert.ToInt32(param2);
            var yyapimyil = Convert.ToInt32(param1);
           var filmList = db.Films.Where(x => x.filmYapimYil >= xyapimyil && x.filmYapimYil <= yyapimyil).ToList();
            if(filmList.Count <1)
            {
              filmList = db.Films.Where(x => x.filmYapimYil >= yyapimyil  && x.filmYapimYil <= xyapimyil).ToList();
            }
            return Json(
                           new
                           {
                               Result = from obj in filmList
                                        select new
                                        {
                                            obj.Id,
                                            obj.filmAd,
                                            obj.filmYapimYil,



                                        }
                           }, JsonRequestBehavior.AllowGet
                           );


        }
    }
}