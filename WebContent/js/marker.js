
(function($){
    
    var markers={},
        activeInfoWindow=null;
    
    $.addMarker=function(opt){
        
        if (opt == undefined) return false;
        
        opt.map=map;
        
        var tmp=new google.maps.Marker(opt);
        
        if (opt.pos) tmp.setPosition(opt.pos);
        
        if (opt.name) {
            if (markers[opt.name] == undefined) markers[opt.name]=[];
            
            markers[opt.name].push(tmp);
            
            tmp.markerFamilyName=opt.name;
        }
        
        if (opt.events) {
            for (var a in opt.events) {
                google.maps.event.addListener(tmp,a,opt.events[a].bind(tmp));
            }
        }
        
        // Borrar, esconder y mostrar
        tmp.erase=function(){
            this.setMap(null);
        }.bind(tmp);
        
        tmp.hide=function(){
            this.setVisible(false);
        }.bind(tmp);
        
        tmp.show=function(){
            google.maps.event.trigger(this, 'show');
            this.setVisible(true);
        }.bind(tmp);
        
        tmp.isVisible=function(){
            return this.visible;
        }.bind(tmp);
        
        // Agrega mensajes a los marcadores
        tmp.info=function(message){
        
            this.infoWindow = new google.maps.InfoWindow({
                content: message
            });

            this.infoWindowListener=google.maps.event.addListener(this, 'click', function () {
                if (activeInfoWindow) {
                    activeInfoWindow.close();
                }
                this.infoWindow.open(map, this);
                activeInfoWindow=this.infoWindow;
            }.bind(this));
        }.bind(tmp);
        
        tmp.deleteInfo=function(){
            this.infoWindow.setMap(null);
            delete this.infoWindow;
            
            google.maps.event.removeListener(this.infoWindowListener);
            delete this.infoWindowListener;
            
        }.bind(tmp);
        
        return tmp;
        
    };
    
    // Para recorrer todos por tipo
    var foreachMarkerByName=function(name,callback){
        
        var toRet=false;
        
        if (typeof name != 'object') {
            name=[name];
        }
        
        for (var a in name){
            var tmp=name[a];
            
            if (tmp==undefined||markers[tmp]==undefined) {
                continue;
            }
            
            toRet=true;
            
            for (var a in markers[tmp]) callback(markers[tmp][a]);
        }
        
        return toRet;
    };
    
    // Esconder todos los marcadores por tipo
    $.hideMarkers=function(name){
        foreachMarkerByName(name,function(el){
            el.hide();
        });
        return this;
    };
    
    // Borrar todos los marcadores por tipo
    $.deleteMarkers=function(name){
        foreachMarkerByName(name,function(el){            
            el.erase();
        });
        delete markers[name];
        return this;
    };
    
    $.getMarkers=function(name){
        return markers[name]||false;
    };
    
    $.getMarkersBound=function(name){
        var bounds=new google.maps.LatLngBounds();
        foreachMarkerByName(name,function(el){
            bounds.extend(el.getPosition());
        });
        
        return bounds;
    };
    
    $.areMarkersVisible=function(name){
        
        var toRet=true;
        
        foreachMarkerByName(name,function(el){            
            if (!el.isVisible()) toRet=false;
        });
        
        return toRet;
        
    };
    
    $.setMarkersBound=function(name){
        map.fitBounds($.getMarkersBound(name));
    };
    
    $(function(){
        $('#map-canvas').on('click','div.box_datoPunto a.avanzar',function(e){
            e.preventDefault();
                
            var name=activeInfoWindow.anchor.name;
            
            for(var a in markers[name]) {
                
                if (name=="searchMarkers"&&a==0) {
                    name="poliMarkers";
                    a=-1;
                } else if (name=="poliMarkers"&&markers[name][parseInt(a)+1]==undefined) {
                    a=0;
                    name="searchMarkers";
                }
                
                console.log((a==-1||markers[activeInfoWindow.anchor.name][a]===activeInfoWindow.anchor));
                console.log(markers[name][parseInt(a)+1]!=undefined);
                
                console.log(name);
                
                if (a!=undefined&&(a==-1||name=="searchMarkers"||markers[activeInfoWindow.anchor.name][a]===activeInfoWindow.anchor)&&markers[name][parseInt(a)+1]!=undefined) {
                    google.maps.event.trigger(markers[name][parseInt(a)+1], 'click');
                    break;
                }
            }
        });
    });
    
    
})(jQuery);

