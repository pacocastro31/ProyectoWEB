$(function(){
	$.ajax({
		url : 'http://localhost:3000/characters',
		type : "GET", 
		dataType : "json",
		success: function(data){
			let new_html = ""
			for(let i = 0; i < data.length; i++){
				new_html += `
				<div class="col-lg-3 col-md-4 col-xs-6 thumb" class="zoom">
                <a href="#">
                    <img  src="${data[i].profilePhoto}" class="zoom img-fluid "  alt="">
                </a>
            </div>
				`;
			}
			$("#images").append(new_html);
			console.log(data);
    	}
	});
});
