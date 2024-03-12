<?php
require_once("./clases/autoBD.php");
use VasquezYober\AutoBD;

$auto_json = isset($_POST["auto_json"]) ? $_POST["auto_json"] : "no hay";
$auto_decode = json_decode($auto_json);
$auto  = new AutoBD($auto_decode->patente,$auto_decode->marca,$auto_decode->color,(float)$auto_decode->precio);
$autoEliminado = $auto;

if(AutoBD::eliminar($auto->Patente())){
    
    $retorno = $autoEliminado->guardarJSON("./archivos/autos_eliminados.json");
    if(json_decode($retorno)->exito)
    {        
      echo '{"exito" : true,"mensaje": "eliminado sin foto y guardado en archivo de eliminados"}';
    }
}else{echo '{"exito" : false,"mensaje": "NO eliminado sin foto"}';}