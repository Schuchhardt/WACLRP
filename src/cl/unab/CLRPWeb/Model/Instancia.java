package cl.unab.CLRPWeb.Model;

import java.util.List;

public class Instancia {
	private String nombre;
	private List<String> ParametrosList;
	private List<String> CLientesList;
	private List<String> DepositosList;

	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public List<String> getParametrosList() {
		return ParametrosList;
	}
	public void setParametrosList(List<String> parametrosList) {
		ParametrosList = parametrosList;
	}
	public List<String> getCLientesList() {
		return CLientesList;
	}
	public void setCLientesList(List<String> cLientesList) {
		CLientesList = cLientesList;
	}
	public List<String> getDepositosList() {
		return DepositosList;
	}
	public void setDepositosList(List<String> depositosList) {
		DepositosList = depositosList;
	}

	
}
