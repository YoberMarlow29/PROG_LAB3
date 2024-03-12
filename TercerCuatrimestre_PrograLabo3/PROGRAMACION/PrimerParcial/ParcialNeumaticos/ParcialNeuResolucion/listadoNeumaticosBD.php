<?php   
require_once("./clases/neumaticoBD.php");
use VasquezYober\NeumaticoBD;
$mostar = isset($_GET["tabla"]) ? $_GET["tabla"] : "sin tabla"; 

$neumaticos=NeumaticoBD::Traer();

if($mostar == "mostrar"){

    echo "<table border = 1>
        <tr>
            <th> id</th>
            <th> marca</th>
            <th> medidas</th>
            <th> precio</th>
            <th> foto</th>
        </tr>";

        foreach($neumaticos as $neumatico)
        {
            echo "
            <tr>
                <td> {$neumatico->Id()}</td>
                <td> {$neumatico->Marca()}</td>
                <td> {$neumatico->Medidas()}</td>
                <td> {$neumatico->Precio()}</td>
                <td><img src=".$neumatico->PathFoto()." width='100px' height='100px'/></td>
                </tr>";
        }
        echo "</table>";
}else
{
    var_dump($retorno);
}

?>
