<?php
//BACKEND

require_once("./clases/autoBD.php");
use VasquezYober\AutoBD;

require_once __DIR__ . '/vendor/autoload.php';
header('content-type:application/pdf');

$mpdf = new Mpdf\Mpdf([
    'orientation' => 'P',
    'pagenumPrefix' => 'Pagina nro. ',
    'pagenumSuffrix' => ' - ',
    'nbpgPrefix' => ' de ',
    'nbpgSuffix' => ' páginas'
]);

$mpdf->SetHeader('Vasquez Yober||{PAGENO}{nbpg}');
$mpdf->SetFooter('|{DATE j-m-Y}|');

// Se elimina la concatenación del objeto $mpdf a $html ya que no tiene sentido en este contexto

$arrayAutos = AutoBD::traer();
$grilla = '<table class="table" border="1" align="center">
            <thead>
                <tr>
                    <th> Patente   </th>
                    <th> Marca     </th>
                    <th> Color     </th>
                    <th> Precio    </th>
                    <th> Foto      </th>
                </tr>
            </thead>';

foreach ($arrayAutos as $auto) {
    $grilla .= "<tr>
                    <td>".$auto->Patente()."</td>
                    <td>".$auto->Marca()."</td>
                    <td>".$auto->Color()."</td>
                    <td>".$auto->Precio()."</td>
                    <td><img src='/lab3/BACKEND/autos/imagenes/".$auto->PathFoto()."' width='100px' height='100px'/></td>
                    </tr>";
}

$grilla .= '</table>';
$mpdf->WriteHTML("<h3>Listado de autos</h3>");
$mpdf->WriteHTML("<br>");
$mpdf->WriteHTML($grilla);
$mpdf->Output("mi_pdf.pdf", "I");
?>
