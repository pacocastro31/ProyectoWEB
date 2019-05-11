$.ajax({
		url : 'https://themcuproject.herokuapp.com/characters',
		type : "GET",
		dataType : "json",
		success: function(data){
			if(localStorage.getItem('admin') != null){
				var newh = "";
        		newh += `<button type="button" id="btn" class="btn btn-primary">Add Character</button>`;
        		newh += `<div><p><br> </p> </div>`;
       		 	$("#cont").append(newh);
   			}

			let new_html = ""
			new_html +=  `<div class="row" id="images">`;
			for(let i = 0; i < data.length; i++){
    		new_html += `
				<div class="col-lg-3 col-md-4 col-xs-6 thumb zoom" id="${data[i]._id}">
				<a href="#">
                    <img  src="${data[i].profilePhoto}" class="img-fluid " alt="">
                </a>
                <h3 class="shname">${data[i].aliases[1]}</h3>
            	</div>
				`;
			}
			new_html+= `</div>`;
			$("#cont").append(new_html);
    	},
    	error: function(data){
    		//do something
    	}
	}).done(function(response){
		$('.zoom').click(function(event){
    	var id = event.currentTarget.id;
    	window.location = ("../characterDetails/characterDetails.html?id="+id);
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
		window.location = ("../login/login.html");
	}
	else {
		//se lleva al home y se borra el token hay que hacer sign in
		//este ya esta listo creo
		localStorage.removeItem('token');
		localStorage.removeItem('admin');
		window.location= ("../home/index.html");
	}

});
