
var map;
var address1=null;
var address2=null;


var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var ubicacion;
    
function initialize() {

      var mapOptions = {
	        center: new google.maps.LatLng(-33.45281718606748, -70.63957510551757), //Santiago, Chile
	        zoom: 12,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById("map_canvas"),
	        mapOptions);

  var contextMenuOptions={};
	contextMenuOptions.classNames={menu:'context_menu', menuSeparator:'context_menu_separator'};

	var menuItems=[];
	menuItems.push({className:'context_menu_item', eventName:'add_depot_click', id:'directionsOriginItem', label:'Agregar Deposito'});
	menuItems.push({className:'context_menu_item', eventName:'add_customer_click', id:'directionsDestinationItem', label:'Agregar Cliente'});
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
					    draggable:true,
					    name:'searchMarkers',
					    animation: google.maps.Animation.DROP,
					    icon:'img/bus.png',
					    title: 'Depósito',
					    visible:false
				  });
				originMarker.setPosition(latLng);
				originMarker.setVisible(true);
				
				if(!originMarker.getMap()){
				    originMarker.setMap(map);
				}
				break;
			    
			case 'add_customer_click':
				   
				    var destinationMarker=$.addMarker({
					draggable:true,
					name:'searchMarkers',
					animation: google.maps.Animation.DROP,
					icon:'img/caminar.png',
					title: 'Cliente',
					visible: false
				    });
				destinationMarker.setPosition(latLng);
				destinationMarker.setVisible(true);
				
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

jQuery(function($){
	    initialize();
	});