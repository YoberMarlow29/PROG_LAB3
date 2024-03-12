$<?php
require_once("./clases/neumatico.php");
use VasquezYober\Neumatico;

$marca = isset($_POST["marca"]) ? $_POST["marca"] : "sin marca"; 
$medidas = isset($_POST["medidas"]) ? $_POST["medidas"] : "sin medidas"; 

$neumatico= new Neumatico($marca,$medidas,0);

$respuesta = Neumatico::verificarNeumaticoJSON($neumatico,"./archivos/neumaticos.json");

echo $respuesta;