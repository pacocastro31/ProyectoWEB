$(function(){
	$.ajax({
		url : 'http://localhost:3000/characters',
		type : "GET", 
		dataType : "json",
		success: function(data){
			let new_html = ""
			for(let i = 0; i < data.length; i++){
				new_html += `
				<div class="col-lg-3 col-md-4 col-xs-6 thumb zoom">
				<a href="../characterDetails/characterDetails.html">
                    <img  src="${data[i].profilePhoto}" class="img-fluid "  alt="">
                </a>
                <h3 class="shname">${data[i].aliases[0]}</h3> 
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
