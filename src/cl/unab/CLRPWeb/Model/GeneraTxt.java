package cl.unab.CLRPWeb.Model;

import java.io.*;


public class GeneraTxt {

	private String LineasDepot;
	private String LineasCustomer;
	private String LineasParameter;
	
	
	public void GenerarTxt(){
		System.out.println(System.getProperty("user.dir"));
	Writer writer = null;
	File costumer =new File("Instancia/costumer.txt");
	File depot =new File("Instancia/depot.txt");
	File parameter =new File("Instancia/parameter.txt");
//GEnera costumer.txt
	try {
	    writer = new BufferedWriter(new OutputStreamWriter(
	          new FileOutputStream(costumer), "utf-8"));
	    String[] fila= LineasCustomer.split(",");
	    String [] customerline;
	    String aux="";
	    for(int x=0;x<fila.length;x++){
	        System.out.println(fila[x]);
	        aux=fila[x];
	        customerline=aux.split(":");
	        for(int y=0;y<customerline.length;y++){
	        	System.out.println(customerline[y]);
	        	if(y==3){
	        		writer.write(customerline[y]);
	        	}
	        	else{
	        	
	        	writer.write(customerline[y]+"\t");
	        	}
	        }
	        writer.write("\n");
	    }
	} catch (IOException ex) {
		 System.out.println("se cayo al escribir el txt customer"+ex);
		// report
	} finally {
	   try {writer.close();} catch (Exception ex) {}
	}
	
	
	//Genera depot.txt
		try {
		    writer = new BufferedWriter(new OutputStreamWriter(
		          new FileOutputStream(depot), "utf-8"));
		    String[] fila= LineasDepot.split(",");
		    String [] depotline;
		    String aux="";
		    for(int x=0;x<fila.length;x++){
		        System.out.println(fila[x]);
		        aux=fila[x];
		        depotline=aux.split(":");
		        for(int y=0;y<depotline.length;y++){
		        	System.out.println(depotline[y]);
		        	if(y==4){
		        		writer.write(depotline[y]);
		        	}
		        	else{
		        	
		        	writer.write(depotline[y]+"\t");
		        	}
		        }
		        writer.write("\n");
		    }
		} catch (IOException ex) {
			 System.out.println("se cayo al escribir el txt depot"+ex);
			// report
		} finally {
		   try {writer.close();} catch (Exception ex) {}
		}
		
		//GEnera parameter.txt
		try {
		    writer = new BufferedWriter(new OutputStreamWriter(
		          new FileOutputStream(parameter), "utf-8"));
		    String[] fila= LineasParameter.split(",");
		    System.out.println(LineasParameter);
		    for(int x=0;x<fila.length;x++){
		        System.out.println(fila[x]);	
		        writer.write(fila[x]+"\n");
		    }
		} catch (IOException ex) {
			 System.out.println("se cayo al escribir el txt de parameter"+ ex);
		} finally {
		   try {writer.close();} catch (Exception ex) {}
		}
		
	
	}
	
	
	
	
	public String getLineasDepot() {
		return LineasDepot;
	}


	public void setLineasDepot(String lineasDepot) {
		LineasDepot = lineasDepot;
	}


	public String getLineasCustomer() {
		return LineasCustomer;
	}


	public void setLineasCustomer(String lineasCustomer) {
		LineasCustomer = lineasCustomer;
	}


	public String getLineasParameter() {
		return LineasParameter;
	}


	public void setLineasParameter(String lineasParameter) {
		LineasParameter = lineasParameter;
	}


	
}
