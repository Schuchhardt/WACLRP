package cl.unab.CLRPWeb.WebService;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import cl.unab.CLRPWeb.Model.Instancia;

import com.google.gson.Gson;

@Path("/getInstancias/all")
public class getInstancias {
	@GET
	@Produces("application/json")
	public String buscar() {
		List<String> ListaInstancias = new ArrayList<String>();
		Instancia i = new Instancia();
		String aux = "";
		Connection conn = null;
		try {
			String URL = "jdbc:mysql://localhost/clrp";
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(URL, "root", "");
			String sql = "select DISTINCT NOMBRE_INSTANCIA From INSTANCIA ORDER BY ID_INSTANCIA ASC;";
			PreparedStatement ps = conn.prepareStatement(sql);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				aux = rs.getString(1);
				ListaInstancias.add(aux);
			}
			i.setNombresList(ListaInstancias);
		} catch (Exception e) {
			System.out.println(e);
		} finally {
			if (conn != null) {
				try {
					conn.close();
				} catch (Exception e) {
					System.out.println(e);
				}
			}
		
		}
		Gson gson = new Gson();
		String json = gson.toJson(i);
		return json;
	}
	
}
