
var map;
var address1=null;
var address2=null;
var idcliente=0;
var iddepot=0;
var depot=new Array();
  var waypts = new Array();
  var polyline;
  var bounds;
  var coordenadas = new Array();
var contadorcl=0;
var contadordp=0;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var ubicacion;
    
function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer({
	    suppressMarkers: true,
            suppressInfoWindows: true,});

      var mapOptions = {
	        center: new google.maps.LatLng(-33.45281718606748, -70.63957510551757), //Santiago, Chile
	        zoom: 12,
		minZoom: 1,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById("map_canvas"),
	        mapOptions);
	    
	    directionsDisplay.setMap(map);

	 var contextMenuOptions={};
	contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};

	var menuItems=[];
	menuItems.push({className:'context_menu_item', eventName:'add_depot_click', id:'depotItem', label:'Agregar Deposito'});
	menuItems.push({className:'context_menu_item', eventName:'add_customer_click', id:'customerItem', label:'Agregar Cliente'});
	menuItems.push({}); //Separador
	menuItems.push({className:'context_menu_item', eventName:'zoom_in_click', label:'Acercar'});
	menuItems.push({className:'context_menu_item', eventName:'zoom_out_click', label:'Alejar'});
	menuItems.push({}); //Separador
	menuItems.push({className:'context_menu_item', eventName:'center_map_click', label:'Centrar el Mapa aqui'});
	menuItems.push({className:'context_menu_item', eventName:'clear_directions_click', id:'clearDirectionsItem', label:'Limpiar el Mapa'});
	contextMenuOptions.menuItems=menuItems;
	
	var contextMenu=new ContextMenu(map, contextMenuOptions);
	
	google.maps.event.addListener(map, 'rightclick', function(mouseEvent){
		contextMenu.show(mouseEvent.latLng);
	});

	google.maps.event.addListener(contextMenu, 'menu_item_selected', function(latLng, eventName){

		switch(eventName){
			case 'add_depot_click':
				    var originMarker=$.addMarker({
					    animation: google.maps.Animation.DROP,
					    icon:'img/deposito.png',
					    title: 'Depósito',
					    visible:false
				  });
				originMarker.setPosition(latLng);
				originMarker.setVisible(true);
				depot.push(latLng);
				
				
		   
				 appendListDepot(latLng);
				if(!originMarker.getMap()){
				    originMarker.setMap(map);
				}
				break;
			    
			case 'add_customer_click':
				   
				    var destinationMarker=$.addMarker({
					animation: google.maps.Animation.DROP,
					icon:'img/camion.png',
					title: 'Cliente',
					visible: false
				    });
				    waypts.push({
				    location: latLng,
				    stopover: true
				});
				destinationMarker.setPosition(latLng);
				destinationMarker.setVisible(true);
				appendListCustomer(latLng);
				  if(!destinationMarker.getMap()){
				    destinationMarker.setMap(map);
				  }
				break;
			    
			case 'clear_directions_click':
			    LimpiarMapa();
				break;
		
				break;
			case 'zoom_in_click':
				map.setZoom(map.getZoom()+1);
				break;
			case 'zoom_out_click':
				map.setZoom(map.getZoom()-1);
				break;
			case 'center_map_click':
				map.panTo(latLng);
				break;
		}
	});	
	
	
}




function appendListDepot(latlon){
    contadordp++;
	$("#datosentrada").show();
    var latlon1=latlon.toString();
    var auxx=latlon1.split(",");
    var x=auxx[0].replace('(','');
    var y=auxx[1].replace(')','');
    iddepot=iddepot+1;
    $("#depositos").append('<tr><td>'+iddepot+'</td><td>'+x+'</td><td>'+y+'</td><td><div id="asd" contenteditable onclick="changestyle($(this));" style="color:red">Ingrese la capacidad del depósito</div></td><td><div id="asd2" contenteditable onclick="changestyle($(this));" style="color:red">Ingrese el costo de apertura del depósito</div></td></tr>');
        $(function(){
 	$("#asd").validarcampos('0123456789.');
	$("#asd2").validarcampos('0123456789.');
});
	
	    if (contadordp>2) {
    $("#depotItem").hide();  
    }
}

function appendListCustomer(latlon){
    contadorcl++
	$("#datosentrada").show();
    var latlon1=latlon.toString();
    var auxx=latlon1.split(",");
    var x=auxx[0].replace('(','');
    var y=auxx[1].replace(')','');
    idcliente=idcliente+1;
    $("#clientes").append('<tr><td>'+idcliente+'</td><td>'+x+'</td><td>'+y+'</td><td><div id="asd3" contenteditable onclick="changestyle($(this));" style="color:red">Ingrese la demanda del cliente</div></td></tr>');
    
    $(function(){
 	$("#asd3").validarcampos('0123456789.');
});
    if (contadorcl>7) {
    $("#customerItem").hide();  
    }
    
    
}

function changestyle(id) {
    $(id).empty();
    $(id).css("color","black");
}



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
var path;

function calcRoute() {
	$("#resultados").show();
	$("#datosentrada").hide();
	var x = (Math.random()*((depot.length)-1));
	x=x.toFixed()
	console.log(x);
  var start = depot[x];
  var end = depot[x];
  console.log(start);

  var request = {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
     directionsDisplay.setDirections(response);
      path = response.routes[0].overview_path;
     // dibujarRuta(coordenadas);
    }
    else{
	console.log('se cayo');
	console.log(status);
    }
  });
  
  var FuncionObj=287200;
  var CostoRuta=287150;
  var CostoNruta=10;
  var CostoDepositos=40;
  
  var Ruta='Ruta #1';
  var demanda=83;
  var status='Factible'
  
   $("#resumen").empty();
   $("#resumen").append('<tr><td>'+FuncionObj+'</td><td>'+CostoRuta+'</td><td>'+CostoNruta+'</td><td>'+CostoDepositos+'</td></tr>');
   $("#demandas").empty();
    $("#demandas").append('<tr><td>'+Ruta+'</td><td>'+demanda+'</td><td>'+status+'</td></tr>');
  
}

 function dibujarRuta(coordenadas) {
		
		lineaServicio = new google.maps.Polyline({
			map: map,
			path: coordenadas,
	        strokeColor: '#0000FF',
	        strokeOpacity: 1,
	        strokeWeight: 5
	   });
		
	    lineaServicio.setMap(map);
	}
	
 function Dist(lat1, lon1, lat2, lon2)
 {
 rad = function(x) {return x*Math.PI/180;};

 var R     = 6378.137;//Radio de la tierra en km
 var dLat  = rad( lat2 - lat1 );
 var dLong = rad( lon2 - lon1 );

 var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 var d = R * c;

 return d.toFixed(3);//Retorna tres decimales
}


jQuery(function($){
	    initialize();
	});