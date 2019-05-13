
window.addEventListener("load", function(event) {
    if(localStorage.getItem('token') == null){
		x = document.getElementById("login");
		x.text = "Log In";
	}
	else {
		x = document.getElementById("login");
		x.text = 'Log Out';
	}

	if(localStorage.getItem("admin") == null){
		alert("You can not be here");
		window.location = ("../home/index.html");
	}
  });

$("#login").click(function(){
	if(localStorage.getItem('token') == null){
		//se lleva a la pagina de sign in
		window.location = ("../login/login.html");
	}
	else {
		//se lleva al home y se borra el token hay que hacer sign in
		//este ya esta listo creo
		localStorage.removeItem('token');
		localStorage.removeItem('admin');
    localStorage.removeItem('userID');
		window.location = ("../index.html");
	}

});

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

if (id != null) {
  $(function(){
  	$.ajax({
  		url : 'https://themcuproject.herokuapp.com/movies/' + id,
  		type : "GET",
  		dataType : "json",
  		success: function(data){
        $("#title").val(data.title);
        $("#director").val(data.director);
        $("#length").val(data.length);
        $("#synopsis").val(data.synopsis);
        $("#premiere").val(data.premiere);
        $("#budget").val(data.budget);
        $("#earnings").val(data.earnings);
        $("#phase").val(data.phase);
        $("#trailer").val(data.trailer);
        $("#rating").val(data.rating);
        $("#poster").val(data.poster);

      },
      error: function(data) {
      		//do something
      }
  	}).done(function(resp){

      configInputs();
      configData();

      $("#btn").click(function(event) {
        var token = localStorage.getItem('token');
  			if (token) {
    			token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
  			}
  			var url_string = window.location.href;
  			var url = new URL(url_string);
  			var id = url.searchParams.get("id");
              let datas = configData();
              $.ajax({
  				type : 'PATCH',
  				url : 'https://themcuproject.herokuapp.com/movies/' + id,
  				crossDomain: true,
  				headers: {
            		'Content-Type':'application/json',
            		'Authorization': 'Bearer ' + token
        			},
  				data: datas,
  				success: function(data){
  					window.location = ("../movieDetails/movieDetails.html?id=" + id)
  				},
  				error:function(error){
                      alert("There's something wrong.");
  				}
  			});
          });
      });
  });
} else {

      configInputs();
      configData();

      $("#btn").click(function(event){
               var token = localStorage.getItem('token');
              if (token) {
              token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
              }
              var url_string = window.location.href;
              var url = new URL(url_string);
              var id = url.searchParams.get("id");
              let datas = configData();
              $.ajax({
                  type : 'POST',
                  url : 'https://themcuproject.herokuapp.com/movies/',
                  crossDomain: true,
                  headers: {
                  'Content-Type':'application/json',
                  'Authorization': 'Bearer ' + token
                  },
                  data: datas,
                  success: function(data){
                      window.location = ("../movies/movies.html")
                  },
                  error:function(error){

                  }
              });
          });
}

function configInputs(){
    $("#add").click(function(event){
        let new_html = ` <input type="text" class="form-control inpu" id="inp" value = "">`;
        $("#inputs").append(new_html);
    });

    $("#addAlias").click(function(event){
        let new_html = `<input type="text" class="form-control inpuAlias" id="inpAlias" value = "">`;
        $("#inputAlias").append(new_html);
    });

    $("#del").click(function(event){
        $('#inputs').children().last().remove();
    });

    $("#delAlias").click(function(event){
        $('#inputAlias').children().last().remove();
    });

}

function configData(){
  let tit = $("#title").val();
  let dir = $("#director").val();
  let len = $("#length").val();
  let syn = $("#synopsis").val();
  let pre = $("#premiere").val();
  let bud = $("#budget").val();
  let ear = $("#earnings").val();
  let pha = $("#phase").val();
  let tra = $("#trailer").val();
  let rat = $("#rating").val();
  let pos = $("#poster").val();

  let data = JSON.stringify({
              title: tit,
              director: dir,
              length: len,
              synopsis: syn,
              premiere: pre,
              budget: bud,
              earnings: ear,
              phase: pha,
              trailer: tra,
              rating: rat,
              poster: pos
              });
    return data;
}


