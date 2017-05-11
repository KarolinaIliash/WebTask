var buttons = document.getElementsByClassName("but");
for(var i = 0; i < buttons.length; i++){
	buttons[i].onclick = function(){
		change(this);
	}
}

function change(obj){
	var b = obj.value1;
	var a = document.getElementById(obj.id + "p");
	if(obj.value == "+"){
		obj.value = "-";
		a.style.display = "block";
	}
	else{
		obj.value = "+";
		a.style.display = "none";
	}
}