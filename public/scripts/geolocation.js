console.log('linked');
navigator.geolocation.getCurrentPosition(coords=>{
	let coordsInput = document.querySelector('#location');
	console.log(coordsInput.value);
	coordsInput.value = `${coords.coords.latitude}, ${coords.coords.longitude}` ;
})
