$(function(){
	$.ajax({
		url : 'https://themcuproject.herokuapp.com/movies',
		type : "GET",
		dataType : "json",
		success: function(data){
			if(localStorage.getItem('admin') != null){
				var newh = "";
        		newh += `<button type="button" id="btn" class="btn btn-primary">Add Movie</button>`;
        		newh += `<div><p><br> </p> </div>`;
       		 	$("#cont").append(newh);

						let new_html = ""
						new_html +=  `<div class="row container" id="images">`;
						for(let i = 0; i < data.length; i++){
							new_html += `
							<div class="col-lg-3 col-md-4 col-xs-6 thumb zoom">
								<a /*href="../movieDetails/movieDetails.html*/">
			        		<img  src="${data[i].poster}" class="img-fluid" id="${data[i]._id}"  alt="">
			        	</a>
								<button type="button" data-toggle="modal" name="${data[i].title}" id="${data[i]._id}" class="deleteBtn" data-target="#exampleModalCenter">Delete</button>
			        	<h3 class="shname">${data[i].title}</h3>
			        </div>
							`;
						}
						new_html += `</div>`;
						$("#cont").append(new_html);
   			} else {
					let new_html = ""
					new_html +=  `<div class="row" id="images">`;
					for(let i = 0; i < data.length; i++){
						new_html += `
						<div class="col-lg-3 col-md-4 col-xs-6 thumb zoom">
							<a /*href="../movieDetails/movieDetails.html*/">
		          	<img  src="${data[i].poster}" class="img-fluid" id="${data[i]._id}"  alt="">
		          </a>
		         	<h3 class="shname">${data[i].title}</h3>
		        </div>
						`;
					}
					new_html += `</div>`;
					$("#cont").append(new_html);
				}
    	},
    	error: function(data){
    		alert("UPS!, there is an error. Try again");
    	}
	}).done(function(response){
		$('.img-fluid').click(function(event){
    	var id = event.currentTarget.id;
    	localStorage.setItem("movie", id);
    	window.location = ("../movieDetails/movieDetails.html?id="+id);
		});
		$('#btn').click(function(event){
    	window.location = ("../editMovie/editMovie.html");
		});

		$('.deleteBtn').click(function(event){
			console.log('si jala')
			$(".modal-title").text("Are you sure you want to delete " + event.currentTarget.title + '?');
			$(".confdel").prop('id', event.currentTarget.id);
			$(".confdel").click(function(event){
				deleteMovie(event.currentTarget.id);
			});
		});

	});
});

function deleteMovie(id){
	 var token = localStorage.getItem('token');
            if (token) {
            token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
            }
	$.ajax({
		url : 'https://themcuproject.herokuapp.com/movies/' + id,
		type : "DELETE",
		headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
                },
		success: function(data){
			alert("Movie was deleted successfully.");
    	},
    	error: function(data){
    		alert("Movie was not deleted successfully.");
    	}
		}).done(function(response){
			location.reload();
	});
}

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
		window.location = ("../login.html");
	}
	else {
		//se lleva al home y se borra el token hay que hacer sign in
		//este ya esta listo creo
		localStorage.removeItem('token');
		localStorage.removeItem('admin');
		localStorage.removeItem('userID');
		window.location= ("../home/index.html");
		location.reload();
	}

});
