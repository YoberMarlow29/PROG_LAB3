<?php
require_once("./clases/autoBD.php");
use VasquezYober\AutoBD;

$obj_auto = isset($_POST["obj_auto"]) ? $_POST["obj_auto"] : "sin obj_auto";
$auto_bd = json_decode($obj_auto);
$auto = new AutoBD($auto_bd->patente);


$array_autos = AutoBD::Traer();
$retorno = "{}";
if($auto->Existe($array_autos)){
    $item = $auto->traerUno();
    if($item != null){        
        $retorno = $item->ToJSON();
    }
}

echo $retorno;