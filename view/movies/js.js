$(function(){
	$.ajax({
		url : 'http://localhost:3000/movies',
		type : "GET", 
		dataType : "json",
		success: function(data){
			let new_html = ""
			for(let i = 0; i < data.length; i++){
				new_html += `
				<div class="col-lg-3 col-md-4 col-xs-6 thumb zoom">
				<a href="../movieDetails/movieDetails.html">
                    <img  src="${data[i].poster}" class="img-fluid "  alt="">
                </a>
                <h3 class="shname">${data[i].title}</h3> 
            </div>
				`;
			}
			$("#images").append(new_html);
    	},
    	error: function(data){
    		//do something
    	}
	});
});
