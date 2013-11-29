	function ajaxexample(inst) {
	    $.ajax({
	        type: 'POST',
	        url: 'action/SendData.action?nombre=' + inst,
	        dataType: 'json',
	        complete: function (data) {
	            var jsonajax = data;
	            if(jsonajax.length!=0){
	            cambiardepag();}
	        }
	 
	    });
	  
	}
	   var instancias1 = $("#instancias1").val();
	    var instancias2 = $("#instancias2").val();
	    var instancias3 = $("#instancias3").val();
	    
function selecciona1(){
	   instancias1 = $("#instancias1").val();
       $('#instancias2').prop('selectedIndex', 0);
       $('#instancias3').prop('selectedIndex', 0);
}
function selecciona2(){
	    instancias2 = $("#instancias2").val();
	    $('#instancias1').prop('selectedIndex', 0);
	    $('#instancias3').prop('selectedIndex', 0);
}
function selecciona3(){
	    instancias3 = $("#instancias3").val();
        $('#instancias1').prop('selectedIndex', 0);
        $('#instancias2').prop('selectedIndex', 0);
}
	function cambiar() {
		   instancias1 = $("#instancias1").val();
		    instancias2 = $("#instancias2").val();
		    instancias3 = $("#instancias3").val();

	    if (instancias1 != "0") {
	    	ReadInstancia(instancias1);
	    };
	    if (instancias2 != "0") {
	    	ReadInstancia(instancias2);
	    };
	    if (instancias3 != "0") {
	    	ReadInstancia(instancias3);
	    };
	}


	function ejecutar() {
	        var instancias1 = $("#instancias1").val();
	        var instancias2 = $("#instancias2").val();
	        var instancias3 = $("#instancias3").val();

	        if (instancias1 != "0") {
	        	 $("#loading").click();
	            ajaxexample(instancias1); 
	           
	        }
	        if (instancias2 != "0") {
	        	$("#loading").click();
	        	  ajaxexample(instancias2); 
		            	       
	        }
	        if (instancias3 != "0") {
	        	  $("#loading").click();
	        	 ajaxexample(instancias3); 
		          	   
	        }

	}
function cambiardepag(){
	window.location.href = "resultados.html";
}	


