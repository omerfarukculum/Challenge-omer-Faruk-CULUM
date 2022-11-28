using C.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C.DataAccess
{
    public class CDBContext : DbContext
    {
       
            public CDBContext() : base("Data Source=localhost;Initial Catalog=CDb;Integrated Security=True;")
            {

            }
            public DbSet<Film> Films { get; set; }
            public DbSet<Salon> Salons { get; set; }
            public DbSet<User> Users { get; set; }
        public DbSet<SalonFilms> SalonFilms { get; set; }




    }
}
