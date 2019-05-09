var url_string = window.location.href
var url = new URL(url_string);
var id = url.searchParams.get("id");
$(function(){
	$.ajax({
		url : 'http://localhost:3000/characters/' + id,
		type : "GET", 
		dataType : "json",
		success: function(data){
			var new_html = ` <div class="col" id="img-col">
        <img src="${data.profilePhoto}" class="img-fluid">
      </div>
      <div class="col">
        <h1>${data.aliases[1]}</h1>
        <br>
        <h2>${data.name}</h2>
        <br>
        <ul>`;
        for(var i = 0; i < data.powers.length; i++){
        	new_html+=`<li> ${data.powers[i]}</li>`;
        }
 		new_html+=`
        </ul>
        <br>`;
        if(data.status == 'Alive'){
        	new_html+=`<p id="alive">${data.status}<p>`;
        } else {
        	new_html+=`<p id="dead">${data.status}<p>`;
        }
        
        new_html+=`
        <br>
        <h3>Who is ${data.aliases[0]}?</h3>
         <p>${data.biography}</p>
        <br>
        <p>${data.age} years</p>
        <br>
        <p>Creators: ${data.creators}</p>
        <br>
        <h3>Actor</h3>
        <p>${data.actor}</p>
      	</div>`;
      	$("#charDet").append(new_html);
      	},
    	error: function(data){
    		//do something
    	}
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
    }
    
});