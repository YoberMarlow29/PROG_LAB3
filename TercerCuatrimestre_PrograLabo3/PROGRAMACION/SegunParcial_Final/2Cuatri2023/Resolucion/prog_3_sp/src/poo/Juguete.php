<?php

use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface as RequestHandler;
use Slim\Psr7\Response as ResponseMW;

require_once "accesoDatos.php";
require_once "Usuario.php";
require_once __DIR__ . "/autentificadora.php";

class Juguete 
{
    public int $id;
    public string $marca;
    public float $precio;
    public string $path_foto;


    public function AgregarUno(Request $request, Response $response, array $args): Response
    {
        $parametros = $request->getParsedBody();

        $obj_respuesta = new stdclass();
        $obj_respuesta->exito = false;
        $obj_respuesta->mensaje = "No se pudo agregar el juguete";
        $obj_respuesta->status = 418;

        if (isset($parametros["juguete_json"])) {
            $obj = json_decode($parametros["juguete_json"]);

            $juguete = new Juguete();
            $juguete->marca = $obj->marca;
            $juguete->precio = $obj->precio;

            //#####################################################
            // Guardado de foto/archivo
            if (count($request->getUploadedFiles())) {
                $archivos = $request->getUploadedFiles();
                $destino = "./src/fotos/";

                $nombreAnterior = $archivos['foto']->getClientFilename();
                $extension = explode(".", $nombreAnterior);
                $extension = array_reverse($extension);

                $foto = $destino . $juguete->marca . "." . $extension[0];
                $archivos['foto']->moveTo("." . $foto); // OjO agregue un punto .
                $juguete->path_foto = $foto;
            }
            //#####################################################

            $id_agregado = $juguete->AgregarJuguete();

            if ($id_agregado) {
                $obj_respuesta->exito = true;
                $obj_respuesta->mensaje = "Juguete Agregado";
                $obj_respuesta->status = 200;
            }
        }

        $newResponse = $response->withStatus($obj_respuesta->status);
        $newResponse->getBody()->write(json_encode($obj_respuesta));

        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    public function TraerTodos(Request $request, Response $response, array $args): Response
    {
        $obj_respuesta = new stdClass();
        $obj_respuesta->exito = false;
        $obj_respuesta->mensaje = "No se encontraron juguetes!";
        $obj_respuesta->dato = "{}";
        $obj_respuesta->status = 424;

        $juguetes = Juguete::TraerJuguetes();

        if (count($juguetes)) {
            $obj_respuesta->exito = true;
            $obj_respuesta->mensaje = "Juguetes encontrados!";
            $obj_respuesta->dato = json_encode($juguetes);
            $obj_respuesta->status = 200;
        }

        $newResponse = $response->withStatus($obj_respuesta->status);
        $newResponse->getBody()->write(json_encode($obj_respuesta));
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    public function BorrarUno(Request $request, Response $response, array $args): Response
    {
        $obj_respuesta = new stdclass();
        $obj_respuesta->exito = false;
        $obj_respuesta->mensaje = "No se pudo borrar el juguete";
        $obj_respuesta->status = 418;

        if (
            isset($request->getHeader("token")[0]) &&
            isset($args["id_juguete"])
        ) {
            $token = $request->getHeader("token")[0];
            $id = $args["id_juguete"];

            $datos_token = Autentificadora::obtenerPayLoad($token);
            $usuario_token = $datos_token->payload->usuario;
            $perfil_usuario = $usuario_token->perfil;// 1- propietario, 2- encargado, 3- empleado

            if ($perfil_usuario == "propietario") {
                if (Juguete::BorrarJuguete($id)) {
                    $obj_respuesta->exito = true;
                    $obj_respuesta->mensaje = "Juguete Borrado!";
                    $obj_respuesta->status = 200;
                } else {
                    $obj_respuesta->mensaje = "El Juguete no existe en el listado!";
                }
            } else {
                $obj_respuesta->mensaje = "Usuario no autorizado para realizar la accion, debe ser propietario. {$usuario_token->nombre} - {$usuario_token->apellido} - {$usuario_token->perfil}";
            }
        }

        $newResponse = $response->withStatus($obj_respuesta->status);
        $newResponse->getBody()->write(json_encode($obj_respuesta));
        return $newResponse->withHeader('Content-Type', 'application/json');
    }

    public function ModificarUno(Request $request, Response $response, array $args): Response
    {
        $parametros = $request->getParsedBody();

        $obj_respuesta = new stdclass();
        $obj_respuesta->exito = false;
        $obj_respuesta->mensaje = "No se pudo modificar el juguete";
        $obj_respuesta->status = 418;

        if (
            isset($request->getHeader("token")[0]) &&
            isset($parametros["juguete"])
        ) {
            $obj_json = json_decode($parametros["juguete"]);

            if ($juguete = Juguete::TraerJuguetePorId($obj_json->id_juguete)) {
                $juguete->marca = $obj_json->marca;
                $juguete->precio = $obj_json->precio;

                $foto = "";
                //#####################################################
                // Guardado de foto/archivo
                if (count($request->getUploadedFiles())) {
                    $archivos = $request->getUploadedFiles();
                    $destino = "./src/fotos/";

                    $nombreAnterior = $archivos['foto']->getClientFilename();
                    $extension = explode(".", $nombreAnterior);
                    $extension = array_reverse($extension);

                    $foto = $destino . $juguete->marca . "_modificacion" . "." . $extension[0];
                    $archivos['foto']->moveTo("." . $foto); // OjO agregue un punto .
                    $juguete->path_foto = $foto;
                }
                //#####################################################

                if ($juguete->ModificarJuguete()) {
                    $obj_respuesta->exito = true;
                    $obj_respuesta->mensaje = "Juguete Modificado!";
                    $obj_respuesta->status = 200;
                } else {
                }
            } else {
                $obj_respuesta->mensaje = "El Juguete no existe en el listado!";
            }

        }

        $newResponse = $response->withStatus($obj_respuesta->status);
        $newResponse->getBody()->write(json_encode($obj_respuesta));
        return $newResponse->withHeader('Content-Type', 'application/json');
    }


    // METODOS PARA INTERACTUAR CON EL ORIGEN DE LOS DATOS, EN ESTE CASO UNA BASE DE DATOS

    public function AgregarJuguete()
    {
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();

        $consulta = $accesoDatos->retornarConsulta(
            "INSERT INTO juguetes (marca, precio, path_foto) 
             VALUES(:marca, :precio, :path_foto)"
        );

        $consulta->bindValue(":marca", $this->marca, PDO::PARAM_STR);
        $consulta->bindValue(":precio", $this->precio, PDO::PARAM_INT);
        $consulta->bindValue(":path_foto", $this->path_foto, PDO::PARAM_STR);
        $consulta->execute();

        return $accesoDatos->retornarUltimoIdInsertado();
    } 

    public static function TraerJuguetePorId(int $id)
    {
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta(
            "SELECT * FROM juguetes 
             WHERE id = :id"
        );
        $consulta->bindValue(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        $auto = $consulta->fetchObject('Juguete');

        return $auto;
    }

    public static function TraerJuguetes()
    {
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta(
            "SELECT * FROM juguetes"
        );
        $consulta->execute();

        return $consulta->fetchAll(PDO::FETCH_CLASS, "Juguete");
    }

    public static function BorrarJuguete(int $id)
    {
        $retorno = false;
        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();
        $consulta = $accesoDatos->retornarConsulta("DELETE FROM juguetes WHERE id = :id");
        $consulta->bindValue(":id", $id, PDO::PARAM_INT);
        $consulta->execute();

        $total_borrado = $consulta->rowCount(); // verifico las filas afectadas por la consulta
        if ($total_borrado == 1) {
            $retorno = true;
        }

        return $retorno;
    }

    public function ModificarJuguete()
    {
        $retorno = false;

        $accesoDatos = AccesoDatos::obtenerObjetoAccesoDatos();

        $consulta = $accesoDatos->retornarConsulta(
            "UPDATE juguetes
             SET marca = :marca, precio = :precio, path_foto = :path_foto
             WHERE id = :id"
        );

        $consulta->bindValue(":id", $this->id, PDO::PARAM_INT);
        $consulta->bindValue(":marca", $this->marca, PDO::PARAM_STR);
        $consulta->bindValue(":precio", $this->precio, PDO::PARAM_INT);
        $consulta->bindValue(":path_foto", $this->path_foto, PDO::PARAM_STR);
        $consulta->execute();

        $total_modificado = $consulta->rowCount(); // verifico las filas afectadas por la consulta
        if ($total_modificado == 1) {
            $retorno = true;
        }

        return $retorno;
    }

}
