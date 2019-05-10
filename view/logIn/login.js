

$('#btn').click(function(){
	var email = document.getElementById("inputEmail");
	var pass = document.getElementById("inputPassword");
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
				window.localStorage.setItem("token", data.token);
				window.location = ("../home/index.html");
			},
			error:function(error){
				alert("NO SE PUDO INICIAR SESION");		
			}
		});
});