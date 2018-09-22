$(document).ready(function() {
	$('#uploadBtn').on('submit', function(e){
		e.preventDefault();
		console.log('uploaded');
		var myUrl = $(this).attr('href');
		var myData = $(this).serialize();
		$.ajax({
			method:'POST',
			url: '/new',
			processData:false,
			contentType:false,
			data:myData,
			done:function(data){
				console.log(data);
			}
		})
	})
});
