$('#btn').click(function(){
	var name = document.getElementById("inputName");
	var email = document.getElementById("inputEmail");
	var pass = document.getElementById("inputPassword");
	var urlP = document.getElementById("inputPhoto");
	if(validateEmail(email.value) && pass.value != null){
		$.ajax({
				type : 'POST',
				url : 'https://themcuproject.herokuapp.com/users',
				crossDomain: true,
				contentType:'application/json',
				data: JSON.stringify({
							name: name.value,
							email: email.value,
							password: pass.value,
							profilePhoto: urlP.value
						}),
				success: function(data){
					window.localStorage.setItem("token", data.token);
					window.location = ("../home/index.html");
				},
				error:function(error){
					alert("NO SE PUDO INICIAR SESION");		
				}
			});
		} else{
			alert("Email y/o contraseña invalidos")
		}
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
