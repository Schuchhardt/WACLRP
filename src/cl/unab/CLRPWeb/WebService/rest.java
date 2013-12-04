
package cl.unab.CLRPWeb.WebService;

import java.util.Set;
import java.util.HashSet;
import javax.ws.rs.core.Application;

public class rest extends Application {

	private Set<Object> singletons = new HashSet<Object>();
	private Set<Class<?>> empty = new HashSet<Class<?>>();
	public rest(){
     singletons.add(new getInstancias());
     singletons.add(new setInstancia());
	}
	@Override
	public Set<Class<?>> getClasses() {
	     return empty;
	}
	@Override
	public Set<Object> getSingletons() {
	     return singletons;
	}
}
