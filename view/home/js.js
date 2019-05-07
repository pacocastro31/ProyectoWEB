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
	