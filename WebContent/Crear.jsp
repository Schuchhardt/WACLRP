<%@ page language="java" contentType="text/html; charset=UTF-8" 
 	pageEncoding="UTF-8"%> 
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crear Instancia | Web App CLRP</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <script src="js/jquery-1.10.2.js"></script> 
    <script src="js/html5.js"></script>
    <script src="js/bsa.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/application.js"></script>
    <script src="js/bootswatch.js"></script>
    <script src="js/main.js"></script>
    <script src="js/lightbox-2.6.min.js"></script>
    
    <link href="css/mod_select.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootswatch.css" rel="stylesheet">
    <link href="css/lightbox.css" rel="stylesheet" />
        <link href="img/waclrp_icon.ico" rel="icon" type="image/x-icon" />
    <link href="img/waclrp_icon.ico" rel="shortcut icon" type="image/x-icon" />

  </head>
<body class="preview" data-spy="scroll" data-target=".subnav" data-offset="80">
<script src="js/bsa.js"></script>


  <!-- Navbar================================================== -->
 <div class="navbar navbar-fixed-top">
   <div class="navbar-inner">
     <div class="container">
       <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
       </a>
       <a class="brand" href="">WACLRP</a>
       <div class="nav-collapse" id="main-menu">
         <ul class="nav" id="main-menu-left">
        <li><a id="swatch-link" href="index.html">Home</a></li>
		  <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown">Resolver instancias <b class="caret"></b></a>
            <ul class="dropdown-menu" id="swatch-menu">
			<li><a href="instancias.html">Seleccionar instancia predefinida</a></li>
			<li class="divider"></li>
			<li><a href="Crear.html">Crear instancia teorica</a></li>
			<li style="display:none"><a href="Crear_Practica.html">Crear instancia práctica</a></li>
			</ul>
		  <li><a id="swatch-link" href="resultados.html">Resultados</a></li>
        </ul>
       </div>
     </div>
   </div>
 </div>

    <div class="container">
	
<!-- Masthead================================================== -->
<header class="jumbotron subhead" id="overview">
  <div class="row">
	<div class="span6">
      <h1>WACLRP</h1>
      <p class="lead">Aplicación Web para el problema de localización y ruteo con capacidad restringida.</p>	    
	</div>
</div>			
 <div class="subnav">

</header>

<!-- Forms================================================== -->
<section id="forms">
  <div class="page-header">
    <h3>Formulario para crear instancias</h3>
  </div>

  <div class="row">
    <div class="span10 offset1">

      <form class="form-horizontal well">
        <fieldset>
          <legend>Ingresa parametros</legend>
          <div class="control-group">
            <label class="control-label" for="input01">Numero de Clientes</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01">
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Numero de Depositos</label>
			<div class="controls">
              <input type="number" class="input-xlarge" id="input01">
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Costo de Vehiculo</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01">
            </div>
          </div>
		  <div class="control-group">
			<label class="control-label" for="input01">Costo de Ruta</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01">
              <p class="help-block">Ingresa solo numeros</p>
            </div>
          </div>

<legend>Ingresa datos de Depositos</legend>
          <div class="control-group">
            <label class="control-label" for="input01">ID</label>
            <div class="controls">
              <span class="input-xlarge uneditable-input">01</span>
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Coordenada X</label>
			<div class="controls">
              <input type="number" class="input-xlarge" id="input01" placeholder="Ingrese numero de coordenada X">
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Coordenada Y</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01" placeholder="Ingrese numero de coordenada Y">
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Capacidad</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01" placeholder="Ingrese numero de capacidad">
            </div>
          </div>
		  <div class="control-group">
			<label class="control-label" for="input01">Costo de apertura</label>
            <div class="controls">
              <input type="number" required="number" class="input-xlarge" id="input01" placeholder="Ingrese Costo de Abrir el deposito">
              <p class="help-block">Ingresa solo numeros</p>  <a class="btn" href="#">Agregar</a>
			</div>
          </div>


<legend>Ingresa datos de Clientes</legend>
          <div class="control-group">
            <label class="control-label" for="input01">ID</label>
            <div class="controls">
              <span class="input-xlarge uneditable-input">01</span>
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Coordenada X</label>
			<div class="controls">
              <input type="number" class="input-xlarge" id="input01" placeholder="Ingrese numero de coordenada X">
            </div>
          </div>
          <div class="control-group">
			<label class="control-label" for="input01">Coordenada Y</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01" placeholder="Ingrese numero de coordenada Y">
            </div>
          </div>
		  <div class="control-group">
			<label class="control-label" for="input01">Demanda</label>
            <div class="controls">
              <input type="number" class="input-xlarge" id="input01" placeholder="Ingrese numero de Demanda">
              <p class="help-block">Ingresa solo numeros</p>  <a class="btn" href="#">Agregar</a>
			</div>
          </div>	  
		  
		  <!-- ================================================== -->		  

          <div class="form-actions">
			<button class="btn btn-primary" onclick="Ejecutar();">Resolver</button>
            <button type="submit" class="btn">Guardar</button>
            <button type="reset" class="btn">Cancelar</button>
          </div>
        </fieldset>
      </form>
    </div>
  </div>

</section>


     <!-- Footer
      ================================================== -->
      <hr>

      <footer id="footer">
        <p class="pull-right"><a href="#">Back to top</a></p>
		</footer>

    </div><!-- /container -->

  </body>
</html>
