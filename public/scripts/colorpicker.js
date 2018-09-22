let colorDiv = document.querySelector('#selectedColor');
let colorPicker = document.querySelector('#colorPicker');
colorPicker.addEventListener('change',value=>{
	console.log(colorPicker.value);
	colorDiv.style.backgroundColor=colorPicker.value;
})