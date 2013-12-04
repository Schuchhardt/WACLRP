package cl.unab.CLRPWeb.Model;

import java.io.*;

public class EjecutaCppNew { 
	
	public String instancia;

	public void EjecutaCLRP(String nombreinstancia){

    	
        try {  	
        	///home/waclrp/
        	String command="/home/waclrp/jboss-as-7.1.1.Final/bin/clrp_new.sh "+nombreinstancia+"";
        	
        	Process p=Runtime.getRuntime().exec(command); 
            InputStream is = p.getInputStream(); 
            BufferedReader br = new BufferedReader (new InputStreamReader (is)); 
   
            String aux = br.readLine(); 
            while (aux!=null) { 
                System.out.println (aux);
                aux = br.readLine(); 
            } 
        }  
        catch (IOException e) { 
        	System.out.println("Error de ejecucion : ");
            e.printStackTrace();
            System.out.println("Fin de errores de ejecucion");
        }
        

    }
	
	
	public String getInstancia() {
		return instancia;
		}
	public void setInstancia(String instancia) {
	this.instancia = instancia;
	}
		
     
}