$(function(){
	$.ajax({
		url : 'http://localhost:3000/movies',
		type : "GET", 
		dataType : "json",
		success: function(data){
			let new_html = ""
			for(let i = 0; i < data.length; i++){
				new_html += `
				<div class="col-lg-3 col-md-4 col-xs-6 thumb zoom" id="${data[i]._id}">
				<a /*href="../movieDetails/movieDetails.html*/">
                    <img  src="${data[i].poster}" class="img-fluid "  alt="">
                </a>
                <h3 class="shname">${data[i].title}</h3> 
            </div>
				`;
			}
			$("#images").append(new_html);
    	},
    	error: function(data){
    		//do something
    	}
	}).done(function(response){
		$('.zoom').click(function(event){    
    	var id = event.currentTarget.id;
    	localStorage.setItem("movie", id);
    	window.location = ("../movieDetails/movieDetails.html?id="+id);
		});
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
		//se lleva a la pagina de sign in
		alert("sesion iniciada");
		//hay que borrar esta madre
		localStorage.setItem('token',"asd");
	}
	else {
		//se lleva al home y se borra el token hay que hacer sign in 
		//este ya esta listo creo
		localStorage.removeItem('token');
		window.location= ("../home/index.html");
		location.reload();
	}
	
});