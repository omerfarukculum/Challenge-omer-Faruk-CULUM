using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.DataAccess.Entities
{
    public class SalonFilms :BaseEntity
    {
        public int FilmId { get; set; }
        public virtual Film Film { get; set; }
        public int SalonId { get; set; }
        public virtual Salon Salon { get; set; }
        public int gosterimYil { get; set; }
    }
}
