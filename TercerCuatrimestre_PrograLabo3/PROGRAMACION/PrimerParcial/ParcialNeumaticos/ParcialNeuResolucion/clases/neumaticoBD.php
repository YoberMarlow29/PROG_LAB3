<?php
namespace VasquezYober;
require_once("./clases/IParte1.php");
require_once("./clases/neumatico.php");
require_once("./clases/IParte2.php");
require_once("./clases/IParte3.php");

require_once("./clases/IParte4.php");





use VasquezYober\Neumatico;
use PDO;
use PDOException;

class NeumaticoBD extends Neumatico implements IParte1,IParte2,IParte3,IParte4{

    protected int $id;
    protected string $pathFoto;

    public function Id(){

        return $this->id;

    }
    public function PathFoto(){

        return $this->pathFoto;
        
    }

    public function __construct(string $marca="", string $medidas="",float $precio=-1, int $id=-1,string $pathFoto=""){
        parent::__construct($marca,$medidas,$precio);
        $this->id = $id != null ? $id : -1;
        $this->pathFoto = $pathFoto != null ? $pathFoto : "sin foto";
    }

    public function ToJSON()
    {
        $json= array(
            "marca"=>$this->marca,
            "medidas"=>$this->medidas,
            "precio"=>$this->precio,
            "id"=>$this->id,
            "pathFoto"=>$this->pathFoto);
        return json_encode($json);
    }
    public function Agregar():bool
    {
        $exito=false;
        try{
            $pdo= new PDO("mysql:host=localhost;dbname=gomeria_bd","root","");
            $sql=$pdo->prepare("INSERT INTO `neumaticos`(`marca`, `medidas`, `precio`, `pathFoto`) 
                                VALUES (:marca,:medidas,:precio,:pathFoto)");

            $sql->bindParam(':marca',$this->marca,PDO::PARAM_STR,50);
            $sql->bindParam(':medidas',$this->medidas,PDO::PARAM_STR,50);
            $sql->bindParam(':precio',$this->precio,PDO::PARAM_INT);
            $sql->bindParam(':pathFoto',$this->pathFoto,PDO::PARAM_STR,50);

            $sql->execute();
            $exito=true;
        }catch(PDOException $e){

            echo $e->getMessage();
            $exito=false;

        }
        return $exito;
    }
    public static function Traer():array
    {
        try{
            $neumaticos=array();
            $pdo= new PDO("mysql:host=localhost;dbname=gomeria_bd","root","");
            //$sql=$pdo->query("SELECT * FROM usuarios"); 
            $sql=$pdo->query("SELECT * FROM neumaticos ");

            $sql->execute();
            
            while($fila=$sql->fetch())
            {
                $id =  $fila["id"];   
                $marca = $fila["marca"];
                $medidas = $fila["medidas"];
                $precio = $fila["precio"];
                $pathFoto = $fila["pathFoto"];
                if($pathFoto != null){
                    $item= new NeumaticoBD($marca,$medidas,$precio,$id,$pathFoto); 
                }else{
                    $item= new NeumaticoBD($marca,$medidas,$precio,$id,"sin foto");
                }
                array_push($neumaticos, $item);
            }
            return $neumaticos;         		
    
        }catch(PDOException $e){

            echo $e->getMessage();

        }
    }

    public static function Eliminar($id): bool
    {
        $exito=false;
        try
        {
            $pdo= new PDO("mysql:host=localhost;dbname=gomeria_bd","root","");

            $sql=$pdo->prepare("DELETE FROM `neumaticos` WHERE id=:id");
            $sql->bindParam(':id',$id,PDO::PARAM_INT);
            $sql->execute();

            $exito=true;

        }catch(PDOException $e)
        {
            echo $e->getMessage();
            $exito=false;
        }

        return $exito;
    }

    public function Modificar(): bool
    {
        $exito=false;
        try{
            $pdo= new PDO("mysql:host=localhost;dbname=gomeria_bd","root","");
            $sql=$pdo->prepare("UPDATE neumaticos SET marca=:marca,medidas=:medidas,precio=:precio,
                                pathFoto=:pathFoto WHERE id = :id");
            //"UPDATE `usuarios`SET correo:correo,clave:clave,nombre:nombre,id_perfil:id_perfil WHERE id=:id"
            $sql->bindParam(':id',$this->id,PDO::PARAM_INT);
            $sql->bindParam(':marca',$this->marca,PDO::PARAM_STR,50);
            $sql->bindParam(':medidas',$this->medidas,PDO::PARAM_STR,8);
            $sql->bindParam(':precio',$this->precio,PDO::PARAM_INT);
            $sql->bindParam(':pathFoto',$this->pathFoto,PDO::PARAM_STR,50);

            $sql->execute();
            $exito=true;
        }catch(PDOException $e){

            echo $e->getMessage();
            $exito=false;

        }
        return $exito;
    }
    public function Existe($array_neumaticos): bool
    {
        $retorno = false;
        if(count($array_neumaticos) > 0){           
            foreach($array_neumaticos as $item) {
                if($this->marca == $item->marca && $this->medidas == $item->medidas){
                    $retorno = true;
                    break;
                }
            }
        }
        return $retorno;  
    }

    public function traerUno(){
        $array = NeumaticoBD::Traer();
        $retorno = null;
        if(count($array) > 0){
            foreach($array as $item) {
                if($this->marca == $item->marca && $this->medidas == $item->medidas){
                    $retorno = $item;
                    break;
                }
            }
        }
        return $retorno;
    }
    public function GuardarEnArchivo(): string
    {
        $retorno = "";		
		$ar = fopen("./archivos/neumaticosbd_borrados.txt", "a");
		$cant = fwrite($ar,$this->MostrarDatos() ."\r\n");		
		if($cant > 0)
		{
			$retorno= '{"exito" : true,"mensaje": "usuario agregado"}';
		}
		else{
			$retorno= '{"exito" : false,"mensaje": "hubo un problema con el archivo"}';
		}
		fclose($ar);
		return $retorno;
    }
    private function MostrarDatos():string{

        return "id:{$this->id},marca:{$this->marca},medidas:{$this->medidas},precio:{$this->precio},pathFoto:{$this->pathFoto}";
    }

    public static function mostrarBorradosJSON(){
        $contenido = file_get_contents('./archivos/neumaticos_eliminados.json');
        $neumaticosEliminados = json_decode($contenido, true);
    
        if (is_array($neumaticosEliminados)) {
            foreach ($neumaticosEliminados as $neumaticoEliminado) {
                echo "Marca: " . $neumaticoEliminado['marca'] . "<br>";
                echo "Medidas: " . $neumaticoEliminado['medidas'] . "<br>";
                echo "Precio: " . $neumaticoEliminado['precio'] . "<br><br>";
            }
        } else {
            echo "Error al decodificar el JSON.";
        }
    }
}