<?php

require_once("./clases/neumatico.php");
use VasquezYober\Neumatico;
$marca = isset($_POST["marca"]) ? $_POST["marca"] : "sin marca"; 
$medidas = isset($_POST["medidas"]) ? $_POST["medidas"] : "sin medidas"; 
$precio = isset($_POST["precio"]) ? $_POST["precio"] : "sin precio"; 

$neumaticos= new Neumatico($marca,$medidas,$precio);

$respuesta = $neumaticos->guardarJSON("./archivos/neumaticos.json");

echo $respuesta;
