<?php


require_once("./clases/auto.php");
use VasquezYober\Auto;
$patente = isset($_POST["patente"]) ? $_POST["patente"] : "sin patente"; 
$marca = isset($_POST["marca"]) ? $_POST["marca"] : "sin marca"; 
$color = isset($_POST["color"]) ? $_POST["color"] : "sin color"; 
$precio = isset($_POST["precio"]) ? $_POST["precio"] : "sin precio"; 

$autos= new Auto($patente,$marca,$color,$precio);

$respuesta = $autos->guardarJSON("./archivos/autos.json");

echo $respuesta;