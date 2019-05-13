window.addEventListener("load", function(event) {
    if(localStorage.getItem('token') == null){
		$("#login").text("Login");
	}
	else {
		$("#login").text("Log Out");
	}
  });

$("#login").click(function(){
	if(localStorage.getItem('token') == null){
		//se lleva a la pagina log in
		//hay que borrar esta madre
		window.localStorage.getItem('token');
		window.location = ("logIn/login.html");
	}
	else {
		//se lleva al home y se borra el token hay que hacer sign in 
		//este ya esta listo creo
		localStorage.removeItem('token');
		localStorage.removeItem('admin');
		localStorage.removeItem('userID');
		location.reload();
	}
	
});
