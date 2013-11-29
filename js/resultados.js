

function ReadFinalReport() {
	leernombre();
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
        var status = lines[4];
        var Tiempos = lines[5];
        for (var i = 0; i < lines.length; i++) {
            //console.log('-------lines ' + i + '--------------');
            //console.log(lines[i]);
        };

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
       // 	console.log(i+1);
       // 	console.log(DepositosAbiertos[i]);
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
                    console.log(rutasall.length);
                    if(rutasall.length==3){
                    	console.log('hay 2');
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
        
        return initialize_arbor();

    });// end function read
}

function leernombre(){
	var file="nombre.txt";

    $.get(file, function (txt) {
    var ftxt =txt;
    var nombre =ftxt;
    var cd = nombre.replace('instancia_','');
   // var xf= cd.replace('_','.');
    $("#titulo").empty();
$("#titulo").append('Resultados obtenidos de la instancia '+cd+'');

    })	;
}
