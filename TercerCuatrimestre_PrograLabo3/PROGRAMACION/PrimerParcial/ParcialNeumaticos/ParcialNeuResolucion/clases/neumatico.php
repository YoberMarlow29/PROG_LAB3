<?php
namespace VasquezYober;

class Neumatico{

    protected string $marca;
    protected string $medidas;
    protected int $precio;

    public function Marca(){

        return $this->marca;
    }
    public function Medidas(){

        return $this->medidas;
    }
    public function Precio(){

        return $this->precio;
    }


    public function __construct(string $marca,string $medidas,int $precio) {
        
        $this->marca=$marca;
        $this->medidas=$medidas;
        $this->precio=$precio;
    }

    public function ToJSON(){
        $json= array(
            "marca"=>$this->marca,
            "medidas"=>$this->medidas,
            "precio"=>$this->precio);
        return json_encode($json);
    }

    public function guardarJSON(string $path){

        $nemuaticos_obtenidos = [];
        $retorno ="";
        if (file_exists($path)) {
            $nemuaticos_obtenidos = json_decode(file_get_contents($path), true);
        }

        $neumatico_nuevo = $this->toJSON(); 
        $nemuaticos_obtenidos[] = json_decode($neumatico_nuevo, true); 
        $neumaticosJSON = json_encode($nemuaticos_obtenidos);

        if (file_put_contents($path, $neumaticosJSON)) {

            $retorno= '{"exito" : true,"mensaje": "usuario agregado al archivo json"}';
        } else {

            $retorno= '{"exito" : false,"mensaje": "hubo un problema con el archivo"}';
        }
        return $retorno;
    }
    public static function TraerTodosJSON(string $path){//carpeta ubicada en ./archivos/usuarios.json
        
        $nemuaticos_obtenidos = [];
        $array_retorno = array();
        if (file_exists($path))
        {
            $nemuaticos_obtenidos = json_decode((file_get_contents($path)), true);
            foreach ($nemuaticos_obtenidos as $neumatico) 
            {
                $usuario = new Neumatico($neumatico['marca'], $neumatico['medidas'], $neumatico['precio']);
                $array_retorno[] = $usuario;
            }
        }
        return $array_retorno;

    }

    public static function verificarNeumaticoJSON(Neumatico $neumatico,string $path){

        $neumaticos=Neumatico::TraerTodosJSON(($path));
        $retorno = '{"exito" : false,"mensaje": "el nuematico no existe en el json"}';
        $cant = 0;

        foreach($neumaticos as $item){

                if($item->medidas == $neumatico->medidas && $item->marca == $neumatico->marca){
                    $cant =+ $item->precio;
                }
        }
        if($cant>0){
            $retorno  = '{"exito" : true,"mensaje": "Existe y la sumatoria de los precios es de $'.$cant.'"}'; 

        }
        return $retorno;
    }
}

