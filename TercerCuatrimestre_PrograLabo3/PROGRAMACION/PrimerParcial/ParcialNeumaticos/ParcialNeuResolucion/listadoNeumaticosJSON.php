<?php
require_once("./clases/neumatico.php");
use VasquezYober\Neumatico;

$neumaticos=Neumatico::TraerTodosJSON("./archivos/neumaticos.json");

var_dump($neumaticos);



