var idc=1;
var idd=1;
var Customer =new Array();
var Depot =new Array();
var Parameter =new Array();
var xy=new Array();
var hayrepetidos;
var DemandaTotal=0;
var CapacidadTotalDep=0;
var validado=false;

function ini(){
$("#cliente_id").val(idc);
$("#deposito_id").val(idd);
$("#clientes_lista, #depositos_lista").hide();
}

function AgregaCliente(){
	var id=$("#cliente_id").val();
	var x=$("#cliente_x").val();
	var y=$("#cliente_y").val();
	var dem=$("#cliente_demanda").val();
	
	if(x=="" || y=="" ||dem==""){
		$("#enblancocl").show();
		return false;}
		else{$("#enblancocl").hide();}
	
	for(var j=0;j<xy.length;j++){
		if(xy[j]==(x+','+y)){
			hayrepetidos=true;
		}else{hayrepetidos=false;}
	}
	
	if(hayrepetidos){
		$("#ubicacionrepetidacl").show();
		validado=false;
		return false;
	}
	else{
		$("#ubicacionrepetidacl").hide();
	xy.push(x+','+y);
	$("#clientes_datos").append('<tr><td>'+id+'</td><td>'+x+'</td><td>'+y+'</td><td>'+dem+'</td></tr>');
	$("#clientes_lista").show();
	idc=idc+1;
	$("#cliente_id").val(idc);
	$("#Nro_Clientes").val(idc-1);
	DemandaTotal=DemandaTotal+parseInt(dem);
	Customer.push(id+':'+x+':'+y+':'+dem);
	validado=true;
	return true;
	}
}

function AgregaDeposito(){
	var id=$("#deposito_id").val();
	var x=$("#deposito_x").val();
	var y=$("#deposito_y").val();
	var cap=$("#deposito_cap").val();
	var cost=$("#deposito_cost").val();
	if(x=="" || y=="" ||cap=="" ||cost==""){
		$("#enblancodep").show();
		return false;}
	else{	$("#enblancodep").hide();}
	
	for(var j=0;j<xy.length;j++){
		if(xy[j]==(x+','+y)){
			hayrepetidos=true;
		}else{hayrepetidos=false;}
	}
	
	if(hayrepetidos){
		$("#ubicacionrepetidadep").show();
		validado=false;
		return false;
	}
	else{
		$("#ubicacionrepetidadep").hide();
		xy.push(x+','+y);
	$("#depositos_datos").append('<tr><td>'+id+'</td><td>'+x+'</td><td>'+y+'</td><td>'+cap+'</td><td>'+cost+'</td></tr>');
	$("#depositos_lista").show();
	idd=idd+1;
	$("#deposito_id").val(idd);
	$("#Nro_Depositos").val(idd-1);
	CapacidadTotalDep=CapacidadTotalDep+parseInt(cap);
	Depot.push(id+':'+x+':'+y+':'+cap+':'+cost);
	validado=true;
	return true;
	}
}

function isNumeric(num){
    return !isNaN(num);
}

$(function(){
 	$("#deposito_x, #deposito_y, #deposito_cap, #deposito_cost").validarcampos('0123456789.');
 	$("#cliente_x, #cliente_y, #cliente_demanda, #Costo_Veh, #Costo_Ruta").validarcampos('0123456789.');
});

(function (a) {
    a.fn.validarcampos = function (b) {
        a(this).on({
            keypress: function (a) {
                var c = a.which,
                    d = a.keyCode,
                    e = String.fromCharCode(c).toLowerCase(),
                    f = b;
                (-1 != f.indexOf(e) || 9 == d || 37 != c && 37 == d || 39 == d && 39 != c || 8 == d || 46 == d && 46 != c) && 161 != c || a.preventDefault();
            }
        });
    };
})(jQuery);

function CrearInstancia(e){
	e.preventDefault();
	var nrocl=$("#Nro_Clientes").val();
	var nrodep=$("#Nro_Depositos").val();
	var cap_veh=$("#Cap_Veh").val();
	var cost_rut=$("#Costo_Ruta").val();
	if(validado){
		$("#validacion").show();
		//return false;
	}
	else{$("#validacion").hide();}
	if(nrocl==""||nrodep==""||cap_veh==""||cost_rut==""){
		$("#enblancopar").show();
		return false;
	}
	else{$("#enblancopar").hide();}
	
	if(DemandaTotal>CapacidadTotalDep){
		$("#demandamayorcapdep").show();
		return false;
	}
	else{$("#demandamayorcapdep").hide();}

	Parameter.push(nrodep);
	Parameter.push(nrocl);
	Parameter.push(cap_veh);
	Parameter.push(cost_rut);
	Customer=Customer.toString();
	Depot=Depot.toString();
	Parameter=Parameter.toString();
	$("#loading").click();
	$.ajax({
		type : 'GET',
		url : 'rest/setInstancia/'+Depot+'/'+Customer+'/'+Parameter,
        dataType: "json",
		complete : function(data) {
			console.log('se completo');
			cambiardepag();
		

		}
	});
	return true;
}
function cambiardepag(){
	window.location.href = "resultados.html";
}	


function Dist(lat1, lon1, lat2, lon2){
x1=$("#deposito_x").val();
y1=$("#deposito_y").val();
x2=$("#cliente_x").val();
y2=$("#cliente_y").val();

var d = Math.sqrt(((x2-x1)*(x2-x1))+((y2-y1)*(y2-y1)));
console.log(d);
return d.toFixed(3);
}

function confirmar(){
var x;
var r=confirm("Esta seguro que desea borrar los datos ingresados?");
if (r==true)
  {
  x="You pressed OK! hay que borrar";
  console.log(x);
  }
else
  {
  x="You pressed Cancel!";
  console.log(x);
  }
}



jQuery(function($){
	  ini();
	  	    });