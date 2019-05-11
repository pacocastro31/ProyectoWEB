
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
var aliases = [];
$(function(){
	$.ajax({
		url : 'https://themcuproject.herokuapp.com/characters/' + id,
		type : "GET", 
		dataType : "json",
		success: function(data){
			aliases = data.aliases
			var new_html= `
			<br>
			 <div class="container" id="containers">
        <div class="row justify-content-center align-items-center">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <form action="" >
                            <div class="form-group">
                                <h5>Name</h5>
                                <input type="text" class="form-control" id="name" value = "${data.aliases[1]}">
                            </div>
                            <div class="form-group">
                                <h5>Biography</h5>
                                <textarea type="text" class="form-control" id="biography" rows="5">${data.biography}</textarea>
                            </div>
                            <div class="form-group">
                                <h5>Actor</h5>
                                <input type="text" class="form-control" id="actor" value = "${data.actor}">
                            </div>
                            <div class="form-group">
                                <h5>Status</h5>
                                <input type="text" class="form-control" id="status" value = "${data.status}">
                            </div>
                            <div class="form-group">
                                <h5>Profile photo url</h5>
                                <input type="text" class="form-control" id="profilephoto" value = "${data.profilePhoto}">
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
        	aliases[1] = $("#name").val();
        	let bio = $("#biography").val();
        	let act = $("#actor").val();
        	let sta = $("#status").val();
        	let pp = $("#profilephoto").val();
        	var token = localStorage.getItem('token');
			if (token) {
  			token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
			}
			var url_string = window.location.href;
			var url = new URL(url_string);
			var id = url.searchParams.get("id");
            $.ajax({
				type : 'PATCH',
				url : 'https://themcuproject.herokuapp.com/characters/' + id,
				crossDomain: true,
				headers: {
          		'Content-Type':'application/json',
          		'Authorization': 'Bearer ' + token
      			},
				data: JSON.stringify({
					aliases: aliases,
					biography: bio,
					actor: act,
					status: sta,
					profilePhoto: pp
				}),
				success: function(data){

					window.location = ("../characterDetails/characterDetails.html?id=" + id)
				},
				error:function(error){
				console.log("falla")

				}
			});
        });
    });
});
