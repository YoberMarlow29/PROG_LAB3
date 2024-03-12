<?php
require_once("./clases/neumaticoBD.php");
use VasquezYober\NeumaticoBD;


$neumatico_json = isset($_POST["neumatico_json"]) ? $_POST["neumatico_json"] : "sin json"; 

function ObtenerPathViejo (NeumaticoBD $neumatico) : null | string{
    $retorno = null;
    $neumaticos = NeumaticoBD::Traer();
    foreach($neumaticos as $item){
        if($neumatico->Id()== $item->Id()){
            $retorno = $item->Pathfoto();
        }
    }
    return $retorno;
} 
if(count($_POST) > 0 ){

    $neumaticoobj = json_decode($neumatico_json);

    $neumaticoviejo = new NeumaticoBD($neumaticoobj->marca,$neumaticoobj->medidas,$neumaticoobj->precio,$neumaticoobj->id,$neumaticoobj->pathFoto);
    
    $pathAMover=ObtenerPathViejo($neumaticoviejo);

    $foto_extension = pathinfo($pathAMover, PATHINFO_EXTENSION);

    
    $destinoModificado = "./neumaticosBorrados/" .$neumaticoobj->id.'.'. $neumaticoobj->marca.".borrado.".date("His").".". $foto_extension;
    
    $new_foto_name = $neumaticoobj->id.'.'. $neumaticoobj->marca.".borrado.".date("His").".". $foto_extension;
    
    $retorno ='{"exito" : false,"mensaje": "neumatico no borrado"}';
    
    if($neumaticoviejo->Eliminar($neumaticoobj->id)){    
        $neumatico = new NeumaticoBD($neumaticoobj->marca,$neumaticoobj->medidas,$neumaticoobj->precio,$neumaticoobj->id,$new_foto_name);
        if($neumatico->GuardarEnArchivo()){
            rename($pathAMover,$destinoModificado);   
            $retorno ='{"exito" : true,"mensaje": "neumatico borrado"}';
        }
    }
    
    echo $retorno;
         
}
else{
    if(file_exists("./archivos/neumaticosbd_borrados.txt")){
    
    echo "
    <table >
        <thead>
            <tr>
                <th>ID</th>
                <th>MARCA</th>
                <th>MEDIDAS</th>
                <th>PRECIO</th>
                <th>PATH</th>
                <th>Foto</th>
            </tr>
        </thead>"; 
        $tabla = "";
        $contenido = file_get_contents('./archivos/neumaticosbd_borrados.txt');
        $lineas = explode("\n", $contenido);
        foreach ($lineas as $linea) {
            // Dividir la línea en campos usando la coma como separador
            $campos = explode(',', $linea);
          
            // Crear una fila de la tabla con los datos
            echo '<tr>';
            foreach ($campos as $campo) {
              // Dividir el campo en clave y valor usando el dos puntos como separador
              $datos = explode(':', $campo);
             // if($datos[0]!=""){                
                $clave = trim($datos[0]);
                $valor = trim($datos[1]);
                if($clave == "pathFoto"){
                    $valor .= '</td><td><img src=/ParcialNeu/neumaticosBorrados/'.urlencode($valor).' width="200" height="200"></td>';
                }
             // }          
              // Mostrar el valor en la celda correspondiente
              echo '<td>' . $valor . '</td>';
            }
            echo '</tr>';
        }
        $tabla .= "</table>";
    
        echo $tabla;
    }
}