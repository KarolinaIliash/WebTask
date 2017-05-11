var obj;
var dataType;
var N;



	
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		var a = this.responseText;
		obj = JSON.parse(a);
	}	
};
xhttp.open("GET", "table.txt", true);
xhttp.send();


/*function sort(cell, table) {
  var rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  switching = true;
  var n = cell.cellIndex;
  dir = "asc"; 
  rows = table.rows;
  var start;
  var finish;
  if(table.value == "smaller"){start = 1; finish = rows.length-1;}
  else if(table.value == "default"){start = 1; finish = 51;}
  else {start = parseInt(table.value); finish = Math.min(start + 50, rows.length-1);}
  while (switching) {
    switching = false;
    for (i = start; i < finish; i++) {
      shouldSwitch = false;
      x = rows[i].cells[n];
      y = rows[i + 1].cells[n];
	  var c = x.innerHTML.charCodeAt(0);
	  if(c < 48 || c > 57){  
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
	  }
	  else{
		  if (dir == "asc") {
        if (parseFloat(x.innerHTML.toLowerCase()) > parseFloat(y.innerHTML.toLowerCase())) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (parseFloat(x.innerHTML.toLowerCase()) < parseFloat(y.innerHTML.toLowerCase())) {
          shouldSwitch= true;
          break;
        }
      }
	  }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++; 
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}*/ //Сортує посторінково

function sort1(cell, table, div, dataArray, titleTable){
	var n = cell.cellIndex;
	if(cell.value == "" ) value = "asc";
	else value = cell.value;
	if(table.rows[1].cells[n].innerHTML < 48 || table.rows[1].cells[n].innerHTML > 57){
		if(value == "asc"){
			dataArray.sort(function(a, b){
				return(parseFloat(a[n]) - parseFloat(b[n]));});
			cell.value = "desc";
		}
		else if(value == "desc"){
			dataArray.sort(function(a, b){
				return(parseFloat(b[n]) - parseFloat(a[n]));});
			cell.value = "asc";
		}
	}
	else{
		if(value == "asc"){
			dataArray.sort(function(a,b){
				var am = Math.min(String(a[n]).length, String(b[n]).length);
				for(var i = 0; i < am; i++){
					if(String(a[n]).charCodeAt(i) > String(b[n]).charCodeAt(i)){return 1;}
					if(String(b[n]).charCodeAt(i) > String(a[n]).charCodeAt(i)){return -1;}
					
				}
				return -1;
			});
		cell.value = "desc";
		}
		else if(value == "desc"){
			dataArray.sort(function(a,b){
				var am = Math.min(String(a[n]).length, String(b[n]).length);
				for(var i = 0; i < am; i++){
					if(String(a[n]).charCodeAt(i) > String(b[n]).charCodeAt(i)){return -1;}
					if(String(b[n]).charCodeAt(i) > String(a[n]).charCodeAt(i)){return 1;}
					
				}
				return -1;
			});
			cell = "asc";
		}
	}
	create(div, table, dataArray, titleTable, cell);
}


function create(divObj, table, dataArray, titleTable, hcell){
	table = document.createElement("TABLE");
	var row = table.insertRow(-1);
	var i = 0;
	var cell;
	var headerCell;
	for (x in titleTable) {
		var headerCell = document.createElement("TH");
        headerCell.innerHTML = titleTable[x];
		headerCell.value = "";
		row.appendChild(headerCell);
		if(hcell != null && headerCell.cellIndex == hcell.cellIndex){
			headerCell.value = hcell.value;
		}

		headerCell.addEventListener("click", function(){
		sort1(this, table, divObj, dataArray, titleTable);
		});
		
        row.appendChild(headerCell);
	}
	row.style.backgroundColor = "khaki";

	var a = dataType;
	if(dataType == "big") N = dataArray.length;
	if(dataType == "small") N = Math.min(dataArray.length, 50);
	if(dataType == "yours"){N = document.getElementById("nCreate").value};
	for(var k = 0; k < N; k++){
		row = table.insertRow(-1);
		row.value = "visible";
		for(var j = 1; j <= dataArray[k].length; j++){
			cell = row.insertCell(-1);
			cell.innerHTML = dataArray[k][j-1];
		}
		if(k > 49)
		{row.style.display = "none"; row.value = "invisible";}
	}
	var id = divObj.id;
	document.getElementById(divObj.id).replaceChild(table, document.getElementById(divObj.id).children[2]);
}


function filt(text, table){
	var isInclude = false;
	for( var i = 1; i < table.rows.length; i++){
		if(table.rows[i].value == "visible"){
		isInclude = false;
		for(var j = 0; j < table.rows[i].cells.length; j++){
			var a = table.rows[i].cells[j].innerHTML.toString();
			if(table.rows[i].cells[j].innerHTML.toString().toLowerCase().includes(text.toLowerCase()) == true){
				isInclude = true;
				break;
			}
		}
		if(isInclude == false){
		table.rows[i].style.display = "none";
		}
		var col;
		if(isInclude == true){
			table.rows[i].style.display = "table-row";
		}
		}}
}


var tablesAmount = 0; 

function createTable(){
	
	var div = document.createElement("DIV");
	tablesAmount++;
	var tableTitle = obj[0];
	var dataArray = [];
	if (dataType == "yours"){ N = document.getElementById("nCreate").value;}
	else if(dataType == "small") {N = Math.min(50, obj.length-1);}
	else N = obj.length-1;
	div.value = N;
	for(var i = 1; i <= N; i++){
		dataArray[i-1] = obj[i];
	}
	
	div.style.border = 1 + "px solid black";
	div.margin = 5 + "px";
	div.className = "fullTable";
	div.id = String(tablesAmount);
	document.body.appendChild(div);
	var name = document.createElement("H3");
	name.innerHTML = "Table" + tablesAmount;
	name.style.fontFamily = "Comic Sans MS";
	name.style.marginLeft = 10 + "px";
	name.style.marginBottom = 3 + "px";
	/*name.style.textAlign = "center";*/
	div.appendChild(name);
	
	var filtText = document.createElement("INPUT");
	filtText.type = "text";
	filtText.value = "";
	filtText.className = "filter";
	filtText.id = "filter" + div.id;
	
	document.getElementById(div.id).appendChild(filtText);
	var table = document.createElement("TABLE");
	document.getElementById(div.id).appendChild(table);
	create(div, table, dataArray, tableTitle, null);
	filtText.oninput = function(){
	filt(filtText.value, div.children[2]);
	};
	var b = div.children[2].rows.length;
	var amBut = div.children[2].rows.length / 52;
	div.children[2].value = "smaller";
	if(parseInt(amBut) != 0){
		div.children[2].value = "default";
		for(var i = 0; i <= amBut; i++){
			var but = document.createElement("BUTTON");
			but.style.height = 30 + "px";
			var t = document.createTextNode(String(i+1));
			but.appendChild(t);
			but.value = String(i+1);
			but.className = "navBut";
			but.onclick = function(){rightPage(this.value, div.children[2]); filt(filtText.value, div.children[2]);};
			document.getElementById(div.id).appendChild(but);
		}
	}
	var details = document.createElement("DIV");
	var rows = div.children[2].rows;
	for(var i = 1; i < rows.length; i++){
		rows[i].onclick = function(){
			details.style.display = "block";
			output(this, details);
		}
	}
	details.style.marginLeft = 10 + "px";
	details.style.marginTop = 5 + "px";
	details.style.border = 1 + "px solid gray";
	details.style.backgroundColor = "beige";
	details.style.display = "none";
	details.style.width = 30 + "%";
	details.style.padding = 2 + "px";
	div.appendChild(details);
}


function data(value){
	dataType = value;
	if(dataType == "yours" && !document.getElementById("nCreate")){
		var am = document.createElement("INPUT");
		am.type = "number";
		am.min = 1;
		am.step = 1;
		am.value = 30;
		document.body.insertBefore(am, document.getElementById("bCreate"));
		am.id = "nCreate";
		am.oninput = function(){N = parseInt(am.innerHTML)};
	}
	else{
		if(document.getElementById("nCreate")){
			document.getElementById("nCreate").parentElement.removeChild(document.getElementById("nCreate"));
		}
	}
}

function output(row, details){
	details.innerHTML = "";
			for(var j = 0; j < row.cells.length; j++){
				details.innerHTML += row.cells[j].innerHTML + " ";
			}	
}


function rightPage(value, table){
	var fromn = (value-1)*50 + 1;
	table.value = String(fromn);
	var ton = Math.min(fromn + 50, table.rows.length);
	for(var i = 1; i < fromn; i++){
		table.rows[i].style.display = "none";
		table.rows[i].value = "invisible";
	}
	for(var i = fromn; i < ton; i++){
		table.rows[i].style.display = "table-row";
		table.rows[i].value = "visible";
	}
	for(var i = ton; i < table.rows.length; i++){
		table.rows[i].style.display = "none";
		table.rows[i].value = "invisible";
	}
}