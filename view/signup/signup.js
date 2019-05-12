// $('#btn').click(function(){
// 	var name = document.getElementById("inputName");
// 	var email = document.getElementById("inputEmail");
// 	var pass = document.getElementById("inputPassword");
// 	var urlP = document.getElementById("inputPhoto");
// 	if(validateEmail(email.value) && pass.value != null) {
// 		$.ajax({
// 				method : 'POST',
// 				dataType: 'json'
// 				url : 'https://themcuproject.herokuapp.com/users',
// 				crossDomain: true,
// 				contentType:'application/json',
// 				data: JSON.stringify({
// 							name: name.value,
// 							email: email.value,
// 							password: pass.value,
// 							profilePhoto: urlP.value
// 						}),
// 				success: function(data){
// 					alert('algo');
// 				},
// 				error:function(error){
// 					alert("NO SE PUDO INICIAR SESION");
// 				}
// 			});
// 		} else{
// 			alert("Email y/o contraseña invalidos.")
// 		}
// });

$('#signup_button').on('click', function(){
  // cargar los valores de password, email, name, age

  var email = $('#inputEmail').val()
  var password = $('#inputPassword').val()
  var name = $('#inputName').val()
  var photo = $('#inputPhoto').val()

  json_to_send = {
    "password" : password,
    "email": email,
    "name": name,
    "profilePhoto": photo
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://themcuproject.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Usuario creado con exito");
      console.log('success: '+ data);
      window.location = '../home/index.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });

});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
