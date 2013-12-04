

function ReadFinalReport() {
	var aux, aux2;
	var NroDepositos;
	var NroClientes;
	var DepositosAbiertos = new Array();
	var CLiente_Ruta = new Array();

	var file = "Final_Report.txt";
	//generacion de grafico arbor js nodos
    $.get(file, function (txt) {
        var filetxt = txt;
        var lines = filetxt.split("\n\n");
        var InfoHead = lines[0];
        var InfoRutas = lines[1];
        var InfoDemanda = lines[2];
        var InfoDepositos = lines[3];
        var Tiempos = lines[5];

        aux = InfoDepositos.split("\n");
        NroDepositos = ((aux.length) - 1);
        for (var i = 0; i < aux.length; i++) {
            if (aux[i].indexOf("Factible") != -1) {
                DepositosAbiertos.push(i + 1);
            }
        }

        aux = InfoRutas.split("\n");
        NroClientes = 0;
        var x;
        x = aux.length;
        var Rutar = new Array();
        for (var i = 0; i < aux.length; i++) {
            aux2 = aux[i].split(" ");
            for (var j = 0; j < aux2.length; j++) {
                if (j >= 3) {
                    CLiente_Ruta.push(aux2[j]);
                }
                if (j >= 4) {
                    NroClientes++;
                }
            }

            Rutar.push(i + '-' + CLiente_Ruta);
            NroClientes--;
            CLiente_Ruta.length = 0;
        }
        
        var tiene=0;
        for (var i = 0; i < NroDepositos; i++) {
        	   for (var j = 0; j < DepositosAbiertos.length; j++){
        	if((i+1)==(DepositosAbiertos[j])){
        		tiene=1;
        	}
        	}
        	   
        	   if(tiene==1){

            var NombreDepot = 'Depósito#' + (i + 1);
            sys.addNode(NombreDepot, {
                color: color[0],
                shape: 'dot',
                radius: 3,
                label: '#D' + (i + 1)
            });
            tiene=0;
        	}
        	else{
        	     var NombreDepot = 'Depósito#' + (i + 1);
                 sys.addNode(NombreDepot, {
                     color: '#E0E0E0',
                     shape: 'dot',
                     radius: 3,
                     label: '#D' + (i + 1)
                 });
        		tiene=0;
        	}
            

        }
var reset=auxcolor=0;
        var rutasel, rutasall, i, nombrecl;
        var colorindex = 0;
        var flag=0;
        
        for (i = 0; i < x; i++) {
            rutasel = Rutar[i].split("-");
            rutasall = rutasel[1].split(",");
        
            var exit = (rutasall.length) -2 ;
            
            for (var j = 0; j < exit; j++) {

                if (j == (exit - 1)) {
                	 nombrecl = 'Cliente#' + (rutasall[j + 1] - NroDepositos);

                    if ((i < (color.length-1)) ) {
                        colorindex = auxcolor + 1;
                    } 
               
                    if(rutasall.length==3){
              
                    	sys.addEdge('Depósito#' + rutasall[0], nombrecl);
                    }else{
                    	 sys.addEdge('Cliente#' + (rutasall[j] - NroDepositos), nombrecl);
                    }
                   
                    sys.addNode(nombrecl, {
                        color: color[colorindex],
                        radius: 2,
                        alpha: 1,
                        label: '#C' + (rutasall[j + 1] - NroDepositos)
                    });
                   
                    sys.addEdge(nombrecl, 'Depósito#' + rutasall[0]);

                } else {
                    if (j == 0) {
                        if ((i < (color.length-1))  ) {
                            colorindex = auxcolor + 1;
                        }
                        nombrecl = 'Cliente#' + (rutasall[j + 1] - NroDepositos);

                        sys.addNode(nombrecl, {
                            color: color[colorindex],
                            radius: 2,
                            alpha: 1,
                            label: '#C' + (rutasall[j + 1] - NroDepositos)
                        });
                       sys.addEdge('Depósito#' + rutasall[0], nombrecl);
                       
                    } else {
                        if ((i < (color.length-1)) ) {
                            colorindex = auxcolor + 1;
                        }

                        nombrecl = 'Cliente#' + (rutasall[j] - NroDepositos);

                       sys.addNode('Cliente#' + (rutasall[j + 1] - NroDepositos), {
                            color: color[colorindex],
                            radius: 2,
                            alpha: 1,
                            label: '#C' + (rutasall[j + 1] - NroDepositos)
                        });
                       sys.addEdge(nombrecl, 'Cliente#' + (rutasall[j + 1] - NroDepositos));

                    }
                }
            }
            auxcolor=i+1;
            flag++;
      
            
        }
   
        var auxrut=InfoRutas.split("\n");
        $('#rutas').empty();
            for (var i = 0; i < auxrut.length; i++) {
            	 var str1 =  str2 ='';
            	var route = auxrut[i].replace('Ruta '+(i+1)+' : ',''); 
            	var index=route.split(' ');
            	for (var j = 0; j < (index.length-1); j++) {
            		str1=(index[j]-NroDepositos);
            		if(j==0){
            			 str2=str2.concat('Depósito #'+index[0]);
            		}
            		else{
            			str2=str2.concat(' --> Cliente #'+str1);
            		}
            	}
            
        $("#rutas").append('<tr><td>Ruta #'+(i+1)+'</td><td>Depósito #'+index[0]+'</td><td>'+str2+'</td></tr>');
        }
        
   //Resumen de resolucion de instancia
        lines=InfoHead.split("\n");
        var fobjetivo=lines[0].replace('Funcion_objetivo = ','');
        var costo_rutas=lines[1].replace('Costo_rutas = ','');
        var costo_nrutas=lines[2].replace('Costo_Nrutas = ','');
        var costo_depots=lines[3].replace('Costo_depositos = ','');
$('#resumen').empty();
$("#resumen").append('<tr><td type="number">'+fobjetivo+'</td><td type="number">'+costo_rutas+'</td><td type="number">'+costo_nrutas+'</td><td type="number">'+costo_depots+'</td></tr>');
        
   //Demandas
		lines=InfoDemanda.split("\n");
		$('#demandas').empty();
		 for (var i = 1; i < (lines.length); i++) {
		var demanda=lines[i].replace('Demanda_ruta '+i+' : ','');
		var auxxx= demanda.split('->');
		demanda=auxxx[0];
		var status=auxxx[1];
		$("#demandas").append('<tr><td>Ruta #'+i+'</td><td>'+demanda+'</td><td>'+status+'</td></tr>');
		 }
		 
		 lines=Tiempos.split("\n");
		 var auxtiempos=new Array();
		 $('#tiempoheuristicas, #tiemposapp').empty();
		 for (var i = 1; i < (lines.length); i++) {
				var tiempo=lines[i-1].split('=');
				var tiempos=tiempo[1]+' segundos';
				auxtiempos.push(tiempos);
			}
		$("#tiempoheuristicas").append('<tr><td>'+auxtiempos[0]+'</td><td>'+auxtiempos[1]+'</td><td>'+auxtiempos[2]+'</td><td>'+auxtiempos[3]+'</td><td>'+auxtiempos[4]+'</td></tr>');
		$("#tiemposapp").append('<tr><td>'+auxtiempos[5]+'</td><td>'+auxtiempos[6]+'</td><td>'+auxtiempos[7]+'</td></tr>');
        return initialize_arbor();

    });// end function read
}

function leernombre(){
	var file="nombre.txt";
	var nombre ="";
	var ftxt="";
    $.get(file, function (txt) {
    ftxt =txt;
    nombre =ftxt;
    
    if(nombre=="/opt/jboss-as-7.1.1.Final/bin/Instancia"){
    	var nro=Math.floor((Math.random()*1000)+40);;
        $("#titulo").empty();
        $("#titulo").append('Resultados obtenidos de la nueva instancia '+nro+'');
    }
    else{
    var cd1 = nombre.replace('instancia_','');
    var cd2 = cd1.replace('_','.');
    $("#titulo").empty();
    $("#titulo").append('Resultados obtenidos de la instancia '+cd2+'');
    }
    
    ReadCostumer(ftxt);
    })	;
    console.log(nombre);
    console.log(ftxt);
   
   // ReadDepot(instancia);
}

function ReadCostumer(txtxt) {
	var file ="Instancias/"+txtxt+"/costumer.txt";
	
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
    	sys.addNode('x'+(i+1), {
              color: color[i+1],
              radius: 1,
              alpha: 0,
              label: 'X: ' + coor_x
          });
    	sys.addNode('y'+(i+1), {
            color: color[i+1],
            radius: 1,
            alpha: 0,
            label: 'Y:' + coor_y
        });
    	sys.addNode('dem'+(i+1), {
            color: color[i+1],
            radius: 1,
            alpha: 0,
            label: 'Demanda: ' + demanda
        });
    	  
    	sys.addEdge('Cliente#' + (id),'x'+(i+1));
    	sys.addEdge('Cliente#' + (id), 'y'+(i+1));
    	sys.addEdge('Cliente#' + (id), 'dem'+(i+1));
    	
    	
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


jQuery(function($){
	leernombre()
	  ReadFinalReport();
	  	initialize_arbor();
	  	    });
