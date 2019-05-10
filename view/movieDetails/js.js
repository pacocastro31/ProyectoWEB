var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("id");
$(function(){
	$.ajax({
		url : 'https://themcuproject.herokuapp.com/movies/' + c,
		type : "GET",
		dataType : "json",
		success: function(data){
			var new_html = ` <div class="col" id="img-col">
        <img src="${data.poster}" class="img-fluid">
      </div>
      <div class="col">
        <h1>${data.title}</h1>
        <br>
        <h2>Director: ${data.director}</h2>
        <br>
        <h3>${data.phase}</h3>
        <h3>Synopsis</h3>
        <p>${data.synopsis}</p>
        <br>
        <h3>Premier</h3>
        <p>${data.premiere}</p>
        <br>
        <h3>Pics</h3>
        <ul>`;
        for (var i=0; i<data.stills.length; i++){
            new_html+=`<li> <img src="${data.stills[i]}" class="img-fluid"></li>`;
        }
        new_html+=`
        </ul>
        <br>
        <h3>Trailer</h3>
        <iframe class="img-fluid" src="${data.trailer}">
        </iframe>
          </div>`;
      	$("#charDet").append(new_html);
      	},
    	error: function(data){
    	}
	});
});

window.addEventListener("load", function(event) {
    if(localStorage.getItem('token') == null){
        x = document.getElementById("login");
        x.text = "Log In";
    }
    else {
        x = document.getElementById("login");
        x.text = 'Log Out';
    }
  });

$("#login").click(function(){
    if(localStorage.getItem('token') == null){
        window.location = ("../login/login.html");
    }
    else {
        //se lleva al home y se borra el token hay que hacer sign in
        //este ya esta listo creo
        localStorage.removeItem('token');
        window.location= ("../home/index.html");
    }

});
