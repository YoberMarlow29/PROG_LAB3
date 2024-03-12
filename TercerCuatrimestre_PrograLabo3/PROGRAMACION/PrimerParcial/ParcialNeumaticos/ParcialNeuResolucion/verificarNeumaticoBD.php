<?php
require_once("./clases/neumaticoBD.php");
use VasquezYober\NeumaticoBD;

$obj_neumatico = isset($_POST["obj_neumatico"]) ? $_POST["obj_neumatico"] : "sin obj_neumatico";
$neumatico_decode = json_decode($obj_neumatico);
$neumatico = new NeumaticoBD($neumatico_decode->marca,$neumatico_decode->medidas);
$array_neumaticos = NeumaticoBD::Traer();
$retorno = "{}";
/*if($neumatico->Existe($array_neumaticos)){
        
    echo $neumatico->ToJSON();
}*/


$array_neumaticos = NeumaticoBD::Traer();
$retorno = "{}";
if($neumatico->Existe($array_neumaticos)){
    $item = $neumatico->traerUno();
    if($item != null){        
        $retorno = $item->ToJSON();
    }
}

echo $retorno;
