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
		//se lleva a la pagina log in
		//hay que borrar esta madre
		window.location = ("../login/login.html");
	}
	else {
		//se lleva al home y se borra el token hay que hacer sign in 
		//este ya esta listo creo
		localStorage.removeItem('token');
		location.reload();
	}
	
});