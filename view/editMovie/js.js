
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
		window.location = ("../home/index.html");
	}

});

var url_string = window.location.href;
var url = new URL(url_string);
var id = url.searchParams.get("id");

$(function(){
	$.ajax({
		url : 'https://themcuproject.herokuapp.com/movies/' + id,
		type : "GET",
		dataType : "json",
		success: function(data){
			var new_html= `
			<br>
			 <div class="container" id="containers">
        <div class="row justify-content-center align-items-center">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <form action="" >
                            <div class="form-group">
                                <h5>Title</h5>
                                <input type="text" class="form-control" id="title" value = "${data.title}">
                            </div>
                            <div class="form-group">
                                <h5>Director</h5>
                                <input type="text" class="form-control" id="director" value = "${data.director}">
                            </div>
                            <div class="form-group">
                                <h5>Length</h5>
                                <input type="text" class="form-control" id="length" value = "${data.length}">
                            </div>
                            <div class="form-group">
                                <h5>Synopsis</h5>
                                <textarea type="text" class="form-control" id="synopsis" rows="5">${data.synopsis}</textarea>
                            </div>
                            <div class="form-group">
                                <h5>Premiere</h5>
                                <input type="text" class="form-control" id="premiere" value = "${data.premiere}">
                            </div>
                            <div class="form-group">
                                <h5>Budget</h5>
                                <input type="text" class="form-control" id="budget" value = "${data.budget}">
                            </div>
                            <div class="form-group">
                                <h5>Earnings</h5>
                                <input type="text" class="form-control" id="earnings" value = "${data.earnings}">
                            </div>
                            <div class="form-group">
                                <h5>Phase</h5>
                                <input type="text" class="form-control" id="phase" value = "${data.phase}">
                            </div>
                            <div class="form-group">
                                <h5>Trailer URL</h5>
                                <input type="text" class="form-control" id="trailer" value = "${data.trailer}">
                            </div>
                            <div class="form-group">
                                <h5>Rating</h5>
                                <input type="text" class="form-control" id="rating" value = "${data.rating}">
                            </div>
                            <div class="form-group">
                                <h5>Poster URL</h5>
                                <input type="text" class="form-control" id="poster" value = "${data.poster}">
                            </div>
                            <button type="button" id="btn" class="btn btn-primary">SAVE</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
            $("#formSec").append(new_html);
      	},
    	error: function(data){
    		//do something
    	}
	}).done(function(resp){
        $("#btn").click(function(event){
        	title = $("#title").val();
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
        	var token = localStorage.getItem('token');
			if (token) {
  			token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
			}
			var url_string = window.location.href;
			var url = new URL(url_string);
			var id = url.searchParams.get("id");
            $.ajax({
				type : 'PATCH',
				url : 'https://themcuproject.herokuapp.com/movies/' + id,
				crossDomain: true,
				headers: {
          		'Content-Type':'application/json',
          		'Authorization': 'Bearer ' + token
      			},
				data: JSON.stringify({
					title: title,
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
				}),
				success: function(data){

					window.location = ("../movieDetails/movieDetails.html?id=" + id)
				},
				error:function(error){
				console.log("falla")

				}
			});
        });
    });
});
