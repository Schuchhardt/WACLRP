package cl.unab.CLRPWeb.Database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CrearInstancia {
	
	
	private String nombre;
	private List<String> datos = new ArrayList<String>();
	
	public String execute() {
	      String ret = "ERROR";
	      Connection conn = null;

	      try {
	         String URL = "jdbc:mysql://localhost/waclrp";
	         Class.forName("com.mysql.jdbc.Driver");
	         conn = DriverManager.getConnection(URL, "waclrp", "");
	         String sql = "select route_id from gtfs.routes where agency_id='TS';";
	         PreparedStatement ps = conn.prepareStatement(sql);
	         ps.setString(1, nombre);
	         ResultSet rs = ps.executeQuery();

	         while (rs.next()) {
	        	 nombre = rs.getString(1);
	            datos.add(nombre);
	            System.out.println(nombre);

	            ret = "SUCCESS";
	         }
	      } catch (Exception e) {
	    	  System.out.println("SE cae");
	    	  System.out.println(e);
	         ret = "ERROR";
	      } finally {
	         if (conn != null) {
	            try {
	               conn.close();
	            } catch (Exception e) {
	            	System.out.println(e);
	            }
	         }
	      }
	      return ret;
	   }
	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<String> getDatos() {
		return datos;
	}

	public void setDatos(List<String> datos) {
		this.datos = datos;
	}


}
