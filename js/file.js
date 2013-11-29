
function ReadParameter(instancia) {
	var file ="Instancias/"+instancia+"/parameter.txt";
	
    if($.get(file, function (txt) {
    	
    	var ftxt=txt;
    	var lineas=ftxt.split("\n");
    	
    	var nrodepositos=lineas[0];
    	var nroclientes=lineas[1];
    	var cap_vehiculos=lineas[2];
    	var costouso_ruta=lineas[3];
 
$('#parametros').empty();
$("#parametros").append('<tr><td type="number">'+nrodepositos+'</td><td type="number">'+nroclientes+'</td><td type="number">'+cap_vehiculos+'</td><td type="number">'+costouso_ruta+'</td></tr>');
    	return true;
})
   ){
    	return true;
    } 
    else{
    	return false;
    }
}


function ReadCostumer(instancia) {
	var file ="Instancias/"+instancia+"/costumer.txt";
	
    if($.get(file, function (txt) {
    	
    	var ftxt=txt;
    	var lineas=ftxt.split("\n");
    	
    	   	$('#clientes').empty();
    	
        for (var i = 0; i < (lineas.length-1); i++) {
    	var cliente=lineas[i].split("\t");
    	var id =cliente[0];
    	var coor_x=cliente[1];
    	var coor_y=cliente[2];
    	var demanda=cliente[3];

$("#clientes").append('<tr><td type="number">'+id+'</td><td type="number">'+coor_x+'</td><td type="number">'+coor_y+'</td><td type="number">'+demanda+'</td></tr>');
    	
        }

    	return true;
})// end function read
   ){
    	return true;
    } 
    else{
    	return false;
    }
}

function ReadDepot(instancia) {
	var file ="Instancias/"+instancia+"/depot.txt";
	
    if($.get(file, function (txt) {
    	
    	var ftxt=txt;
    	var lineas=ftxt.split("\n");
    	$('#depositos').empty();
        for (var i = 0; i < (lineas.length-1); i++) {
	    	var deposito=lineas[i].split("\t");
	    	var id =deposito[0];
	    	var coor_x=deposito[1];
	    	var coor_y=deposito[2];
	    	var cap=deposito[3];
	    	var o_cost=deposito[4];
	   
$("#depositos").append('<tr><td type="number">'+id+'</td><td type="number">'+coor_x+'</td><td type="number">'+coor_y+'</td><td type="number">'+cap+'</td><td type="number">'+o_cost+'</td></tr>');
    	
        }

    	return true;
})// end function read
   ){
    	return true;
    } 
    else{
    	return false;
    }
}

function ReadInstancia(instancia) {
	
	if(ReadParameter(instancia) && ReadDepot(instancia) && ReadCostumer(instancia) ){
		$("#titulo").empty();
		console.log(instancia);
		var aux =instancia.replace("_"," ");
		var nombre =aux.replace("_",".");
		console.log(nombre);
		$("#titulo").append('<h3>Datos de la '+nombre+'</h3>');
		$("#tables").show();
	}
	else{
		$("#tables").hide();
		}
		
	
}

