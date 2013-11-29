package cl.unab.CLRPWeb.Model;

import java.io.*;

public class GeneraTxt {
	
	public GeneraTxt(){
	Writer writer = null;

	try {
	    writer = new BufferedWriter(new OutputStreamWriter(
	          new FileOutputStream("filename.txt"), "utf-8"));
	    writer.write("Something \n");
	    writer.write("hila");
	   
	    System.out.println("se escribio el txt");
	} catch (IOException ex) {
	  // report
	} finally {
	   try {writer.close();} catch (Exception ex) {}
	}
	}
	
}
