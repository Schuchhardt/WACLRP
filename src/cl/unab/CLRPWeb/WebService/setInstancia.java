package cl.unab.CLRPWeb.WebService;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import cl.unab.CLRPWeb.Model.EjecutaCppNew;
import cl.unab.CLRPWeb.Model.GeneraTxt;


@Path("/setInstancia/{depot}/{customer}/{parameter}")
public class setInstancia {
	@GET
	@Produces("application/json")
	public void crear(@PathParam("depot") String depot, @PathParam("customer") String customer, @PathParam("parameter") String parameter) {
	GeneraTxt g=new GeneraTxt();
	g.setLineasDepot(depot);
	g.setLineasCustomer(customer);
	g.setLineasParameter(parameter);
	
	g.GenerarTxt();
	
	EjecutaCppNew cpp = new EjecutaCppNew();
	cpp.EjecutaCLRP("/opt/jboss-as-7.1.1.Final/bin/Instancia");
	
	
	
		
		
	}
	
}
