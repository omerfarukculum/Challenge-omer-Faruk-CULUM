$(document).ready(function () {
    $("#InsertFilm").on("click", function () {
        var Film = {
            Id: 1,
            filmAd: $("#FilmAd").val(),
            filmYapimYil: $("#FilmYapimYil").val(),
        }
        $.ajax({
            type: "POST",
            url: "/Film/InsertFilm",
            data: Film

        })
        $("#FilmAd").val("");
        $("#FilmYapimYil").val("");
        swal("İşlem Başarılı!", "Veri Kaydedildi", "success");
    });
});
function DeleteFilm(id) { 
$(document).ready(function () {
   
    var Film = {
        Id: id,

    }
        $.ajax({
            url: '/Film/DeleteFilm', 
            type: 'POST', 
            data: Film,
        });
    success: {
        deleteFilmList();
        swal("İşlem Başarılı!", "", "success");
        }
 

 
    
});
}
function Films() {
    var url = '/Film/GetFilms'
    $.getJSON(url, function (data) {
        for (var item in data.Result) {
            var Film = '<div class="col-xl-3 col-md-6"><div class="card bg-primary text-white mb-4"><div class="card-body">' + data.Result[item].filmAd + '</div><div class="card-footer d-flex align-items-center justify-content-between"><small class="small text-white stretched-link">Yapım Yılı : ' + data.Result[item].filmYapimYil + '</small></div></div></div>'
            $('#FilmCard').append(Film);
        }
    });
}
function deleteFilmList() {
    $(".deletecard").remove();
    $.ajax({
        url: "/Film/GetFilms",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            
            for (var item in data.Result) {
                var Film = '<div  class="col-xl-3 col-md-6 deletecard"><div class="card bg-warning text-white mb-4" ><div class="card-body">' + data.Result[item].filmAd + '</div><input type="hidden" value="' + data.Result[item].Id + '" id="FilmId" class="form-control"><div class="card-footer d-flex align-items-center justify-content-between"><small>' + data.Result[item].filmYapimYil + '</small> <a href="#" onclick="DeleteFilm(' + data.Result[item].Id + ')" id="DeleteFilm" class=" btn btn-danger">Sil</a></div></div></div>'
                $('#DeleteFilmCard').append(Film);
            }
        },

        error: function (error) {
            swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
        }
    });


}
function UpdateFilms() {
    $.ajax({
        url: "/Film/GetFilms",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            for (var item in data.Result) {
                var Film = '<div  class="col-xl-3 col-md-6 updatecard"><div class="card bg-success text-white mb-4" ><div class="card-body">' + data.Result[item].filmAd + '</div><input type="hidden" value="' + data.Result[item].Id + '" id="FilmId" class="form-control"><div class="card-footer d-flex align-items-center justify-content-between"><small>' + data.Result[item].filmYapimYil + '</small> <a href="#" onclick="UpdateFilm(' + data.Result[item].Id + ')" id="UpdateFilm" class=" btn btn-warning">Güncelle</a></div></div></div>'
                $('#UpdateFilmCard').append(Film);
            }
        },

        error: function (error) {
            swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
        }
    });
}

function UpdateFilm(id) {
    $.ajax({
        url: "/Film/GetIdFilm/" + id,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            $("#editFilmModal #editFilmForm #val-filmad").val(data.Result.filmAd);
            $("#editFilmModal #editFilmForm #val-filmyapimyil").val(data.Result.filmYapimYil);
            $("#editFilmModal #editFilmForm #val-filmid").val(data.Result.Id);
            $("#editFilmModal").modal('toggle'); 
        },
     
        error: function (error) {
            swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
        }
    });
}


$(document).ready(function () {
    $("#updateFilm").on("click", function () {

        var Film = {
            Id: $("#val-filmid").val(),
            filmAd: $("#val-filmad").val(),
            filmYapimYil: $("#val-filmyapimyil").val(),
        }
        $.ajax({
            type: "POST",
            url: "/Film/UpdateFilm",
            data: Film,
            success: function () {
                $("#editFilmModal").modal('toggle');
                $(".updatecard").remove();
                UpdateFilms();
                swal("İşlem Başarılı!", "Veri Güncellendi", "success");
            },
            error: function (error) {
                swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
            }
        })
    });

});
function fillSalonDropdown() {
  
    $.ajax({
        url: "/Film/GetSalon",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
      
            for (var i = 0; i < data.Result.length; i++) {
                $("#salonId").append('<option value="' + data.Result[i].Id + '">' + data.Result[i].salonAd + '</option>');
            }
        },
        error: function (error) {

        }
    })
}
$(document).ready(function () {
    $("#getSalonFilms").on("click", function () {
        var id = $("#salonId").val();    
        $(".salonFilmcard").remove();
        $.ajax({
            url: "/Film/GetSalonIdFilms/" + id,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data) {
               
                for (var item in data.Result) {
                    $("#SalonFilms").append('<div  class="col-xl-3 col-md-6 salonFilmcard"><div class="card bg-success text-white mb-4" ><div class="card-body">' + data.Result[item].filmAd + '</div><input type="hidden" value="' + data.Result[item].Id + '" id="FilmId" class="form-control"><div class="card-footer d-flex align-items-center justify-content-between"><small>' + data.Result[item].filmYapimYil + '</small> </div></div></div>');

                }
                swal("İşlem Başarılı!", "Veri Getirildi", "success");
            },

            error: function (error) {
                swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
            }
        });

    });

});
function fillFilmDropdown() {

    $.ajax({
        url: "/Film/GetFilms",
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            for (var i = 0; i < data.Result.length; i++) {
                $("#filmId").append('<option value="' + data.Result[i].Id + '">' + data.Result[i].filmAd + '</option>');
            }
        },
        error: function (error) {

        }
    })
}
$(document).ready(function () {
    $("#getFilmSalons").on("click", function () {

        var id = $("#filmId").val();

        $(".filmSaloncard").remove();

        $.ajax({
            url: "/Film/GetFilmIdSalons/" + id,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                for (var i = 0; i < data.Result.length; i++) {
                   
                    $("#filmSalons").append('<div class="col-xl-3 col-md-6 filmSaloncard"><div class="card bg-primary text-white mb-4"><div class="card-body">' + data.Result[i].salonAd + '</div><div class="card-footer d-flex align-items-center justify-content-between"><small class="small text-white stretched-link"><h5>Gösterim Yılı</h5> ' + data.Result[i].gosterimYil + '</small></div></div></div>');
                }
                swal("İşlem Başarılı!", "Veri Getirildi", "success");
            },
            error: function (error) {
                swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
            }
        });
    });
});

$(document).ready(function () {
    $("#yapimyilsearch").on("click", function () {
        var xyapimyil = $("#x-yapimyili").val();
        var yyapimyil = $("#y-yapimyili").val();  
        $(".yapimcard").remove();
        $.ajax({
            url: "/Film/Getyapimyil?param1=" + yyapimyil + "&param2=" + xyapimyil,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            
            success: function (data) {
            
                for (var i = 0; i < data.Result.length; i++) {

                    $("#filmYapimYil").append('<div  class="col-xl-3 col-md-6 yapimcard"><div class="card bg-success text-white mb-4" ><div class="card-body">' + data.Result[i].filmAd + '</div><div class="card-footer d-flex align-items-center justify-content-between"><small>Yapım Yılı :' + data.Result[i].filmYapimYil + '</small> </div></div></div>');
                }
                swal("İşlem Başarılı!", "Veri Getirildi", "success");
            },
            error: function (error) {
                swal("İşlem Başarısız", "Bir Sorun İle Karşılaşıldı!", "error");
            }
        });
    });

});