<?php
require_once("./clases/neumaticoBD.php");
use VasquezYober\NeumaticoBD;


$neumatico_json = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : "sin empleado"; 
$neumatico_decode = json_decode($neumatico_json);

//var_dump($neumatico_decode);
$neumatico  = new NeumaticoBD($neumatico_decode->marca,$neumatico_decode->medidas,(float)$neumatico_decode->precio);

if($neumatico->agregar()){
    echo '{"exito" : true,"mensaje": "neumatico sin foto agregado"}';
}else{echo '{"exito" : false,"mensaje": "neumatico sin foto NO agregado"}'; }
