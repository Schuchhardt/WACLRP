package cl.unab.CLRPWeb.Action;

import java.io.InputStream;
import java.io.StringBufferInputStream;
import java.text.DecimalFormat;
import java.text.NumberFormat;

import cl.unab.CLRPWeb.Model.EjecutaCpp;
import cl.unab.CLRPWeb.Model.GeneraTxt;
import com.opensymphony.xwork2.Action;
 
public class RunClrpAction{
	
	private String nombre;
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String execute() {
	
		long startTime = System.currentTimeMillis();

	
	    	System.out.println(getNombre());
	    	System.out.println(nombre);
	    	if(getNombre().equals("")){
	    		return Action.ERROR;
	    	}
	    	else{
	    	EjecutaCpp cpp = new EjecutaCpp();
	    	//cpp.setInstancia(getNombre());
	    	cpp.EjecutaCLRP(getNombre());
	    	String temp= cpp.toString();
	         System.out.println(temp);
	     	long endTime   = System.currentTimeMillis();
	     	NumberFormat formatter = new DecimalFormat("#0.00000");
	     	
	     	
			String total=formatter.format((endTime - startTime) / 1000d);
			System.out.println("tiempo total de ejecucion fue: "+total+ " segundos");
			
	        return Action.SUCCESS;
	    	}
	         
	 }

		
	  

	 
	}


