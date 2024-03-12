<?php
namespace VasquezYober;

interface IParte3{

    public function Existe($array_neumaticos):bool;
    public function GuardarEnArchivo(string $path): string;

}