$('#btn').click(function(){
	var email = document.getElementById("inputEmail");
	var pass = document.getElementById("inputPassword");
	if ( validateEmail(email.value) && pass.value != null){
		$.ajax({
			type : 'POST',
			url : 'https://themcuproject.herokuapp.com/users/login',
			crossDomain: true,
			contentType:'application/json',
			data: JSON.stringify({
						email: email.value,
						password: pass.value
					}),
			success: function(data){
				console.log(data);
				if(data.user.type == "admin"){
					window.localStorage.setItem('admin', 'true');
				}
				window.localStorage.setItem("token", data.token);
				window.localStorage.setItem("userID", data.user.id);
				window.location = ("../index.html");
			},
			error:function(error){
				alert("Email y/o contraseña incorrectos. Verificalos pls");		
			}
		});
	} else {
		alert("Email y/o contraseña invalidos")
	}
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}