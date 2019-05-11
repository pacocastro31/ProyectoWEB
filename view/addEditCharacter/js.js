
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
            $("#name").val(data.aliases[1]);
            $("#biography").val(data.biography);
            $("#actor").val(data.actor);
            $("#status").val(data.status);
            $("#profilephoto").val(data.profilePhoto);

			var new_html= "";
            for (var i = 0; i < data.powers.length; i++){
                new_html+= `<input type="text" class="form-control inpu" id="inp" value = "${data.powers[i]}">`;
            }
            $("#inputs").append(new_html);
      	},
    	error: function(data){
    		//do something
    	}
	}).done(function(resp){

        agregaInput();

        borraInput();

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
				type : 'PATCH',
				url : 'https://themcuproject.herokuapp.com/characters/' + id,
				crossDomain: true,
				headers: {
          		'Content-Type':'application/json',
          		'Authorization': 'Bearer ' + token
      			},
				data: datas,
				success: function(data){
					window.location = ("../characterDetails/characterDetails.html?id=" + id)
				},
				error:function(error){

				}
			});
        });
    });
});

function agregaInput(){
    $("#add").click(function(event){
        let new_html = ` <input type="text" class="form-control inpu" id="inp" value = "">`;
        $("#inputs").append(new_html);
    });
}

function borraInput(){
    $("#del").click(function(event){
        $('#inputs').children().last().remove();
    });
}

function configData(){

            aliases[1] = $("#name").val();
            let bio = $("#biography").val();
            let act = $("#actor").val();
            let sta = $("#status").val();
            let pp = $("#profilephoto").val();
            let powers = [];
            $('.inpu').each(function(i, obj) {
                powers[i] = obj.value
            });

            let data = JSON.stringify({
                        aliases: aliases,
                        biography: bio,
                        actor: act,
                        status: sta,
                        profilePhoto: pp,
                        powers: powers
                        });
    return data;
}