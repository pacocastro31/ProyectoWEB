
var url_string = window.location.href
var url = new URL(url_string);
var c = url.searchParams.get("id");
$(function(){
	$.ajax({
		url : 'https://themcuproject.herokuapp.com/movies/' + c,
		type : "GET",
		dataType : "json",
		success: function(data){
			var new_html = ` <div class="col" id="img-col">
        <img src="${data.poster}" class="img-fluid">
      </div>
      <div class="col">`;
			if(localStorage.getItem('admin') != null){
        new_html+=`<button type="button" id="btn" class="btn btn-primary">Edit Movie</button>`;
      }
        new_html += `<h1>${data.title}</h1>
        <br>
        <h2>Director: ${data.director}</h2>
        <br>
        <h3>${data.phase}</h3>
        <h3>Synopsis</h3>
        <p>${data.synopsis}</p>
        <br>
        <h3>Premier</h3>
        <p>${data.premiere}</p>
        <br>
        <h3>Pics</h3>`
        for (var i=0; i<data.stills.length; i++){
            new_html+=`<img src="${data.stills[i]}" class="img-fluid"> `;
        }
        new_html+=`
        </ul>
        <br>
        <h3>Trailer</h3>
        <iframe src="${data.trailer}" class="img-fluid">
        </iframe>
          </div>`;
      	$("#charDet").append(new_html);
      	},
    	error: function(data){
    	}
	}).done(function(resp){
        $("#btn").click(function(event){
            var id = event.currentTarget.id;
            window.location = ("../editMovie/editMovie.html?id=" + url.searchParams.get("id"));
        });
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
        window.location = ("../logIn/login.html");
    }
    else {
        //se lleva al home y se borra el token hay que hacer sign in
        //este ya esta listo creo
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        localStorage.removeItem('userID');
        window.location= ("../index.html");
    }

});

$("#like").click(function(event){
    $("#likeBtn").toggleClass('fa-thumbs-down fa-thumbs-up');
    if($("#likeBtn").hasClass( "fa-thumbs-down" )){
        $("#likeBtn").css('color', 'black');
    }else{
        $("#likeBtn").css('color', 'red');
    }
});

$("#sendComm").click(function(event){

  if ( localStorage.getItem('token') != null){
     var token = localStorage.getItem('token');
    if (token) {
    token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
    }
    
    let datas = configData();
    $.ajax({
        type : 'POST',
        url : 'https://themcuproject.herokuapp.com/comments',
        crossDomain: true,
        headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
        },
        data: datas,
        success: function(data){
            alert("Your comment was added successfully");
            location.reload()
        },
        error:function(error){
            alert("UPS! There is an error")
         }
    });
  } else {
    alert("Please log in to comment!")
    $("#reviewText").val("");
  }
   
});
var url_string = window.location.href;
  var url = new URL(url_string);
  var id = url.searchParams.get("id");
function configData(){
  
  let text = $("#reviewText").val();
  let userID = localStorage.getItem('userID');
  let movieID = id;
  let like = false;
    if($("#likeBtn").hasClass( "fa-thumbs-down" )){
        //does nothing
    }else{
        like = true;
    }

  let data = JSON.stringify({
  "movieID":movieID,
  "userID": userID,
  "text": text,
  "like": like
    });
  console.log(data);
    return data;
}


$.ajax({
    url : 'https://themcuproject.herokuapp.com/comments/' + id,
    type : "GET",
    dataType : "json",
    success: function(data){
      var new_html = "";
      for (var i = 0; i < data.length; i++){
        new_html+=` <div class="card" style="margin: 7px;"><div class="card-body">
          <div class="row">
              <div class="col-md-2">
                  <img src="${data[i].userImage}" class="img-circle img-fluid"/>
              </div>
              <div class="col-md-10" style="text-align: left;">
                  <h5> ${data[i].userName}
                 </h5>
                  <p>${data[i].text}</p>

                  <div style="text-align: right;">`;
        if (data[i].like){
       new_html += `<i class="fa fa-thumbs-up" href="#" id="likeBtn" style="font-size:36px;color:red; margin-top: 10px;"></i>`;
      } else {
       new_html += `<i class="fa fa-thumbs-down" href="#" id="likeBtn" style="font-size:36px;color:black; margin-top: 10px;"></i>`;
      }
      if(localStorage.getItem("userID") == data[i].userID){
       new_html+= `<a href="#/"><i class="fa fa-trash-o" style="font-size:36px;color:red" id="${data[i]._id}"></i></a>`;
      }
      new_html+=`
                  </div>
              </div>
          </div>
      </div></div>`;
      }
      $("#commSection").append(new_html);
    },
    error: function(data){

    }
  }).done(function(response){
    $(".fa-trash-o").click(function(event){
        confirm(event.currentTarget.id);
    });
});

function confirm(id){

   var token = localStorage.getItem('token');
    if (token) {
    token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
    }

  $.ajax({
    url : 'https://themcuproject.herokuapp.com/comments/' + id,
    type : "DELETE",
    headers: {
                'Content-Type':'application/json',
                'Authorization': 'Bearer ' + token
                },
    success: function(data){
      alert("Comment was deleted successfully");
      },
      error: function(data){
        alert("Comment was not deleted successfully");
      }
    }).done(function(response){
      location.reload();
  });
}
