<?php
require_once("./clases/auto.php");
use VasquezYober\Auto;

$patente = isset($_POST["patente"]) ? $_POST["patente"] : "sin patente"; 

$neumatico= new Auto($patente,"","",0);

$respuesta = Auto::verificarAutoJSON($neumatico,"./archivos/autos.json");

echo $respuesta;