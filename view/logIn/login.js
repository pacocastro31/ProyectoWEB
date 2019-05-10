$("#loginBtn").click(function(event){
	alert("a");
	if(validateEmail($("#inputEmail").val()) && $("#inputPassword").val() != ""){
		alert("a");
		$.ajax({
			type : 'POST',
			url : 'https://themcuproject.herokuapp.com/users/login',
			contentType:'application/json',
			data: JSON.stringify({
						email: $("#inputEmail").val(),
						password: $("#inputPassword").val()
					}),
			success: function(data){
				localStorage.setItem("token", data.token);
				window.location = ("../home/index.html");
			},
			error:function(error){
				alert("NO SE PUDO INICIAR SESION");
			}
		});
	} else{
		alert("Email y/o contraseña no son validos");
	}
	
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
