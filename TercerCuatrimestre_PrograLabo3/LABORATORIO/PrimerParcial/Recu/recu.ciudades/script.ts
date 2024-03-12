/// <reference path="./clases/manejadora.ts"/>
/// <reference path="./clases/manejadoraCiudadanoFoto.ts"/>

window.addEventListener("load", ()=>
{
    if(window.location.pathname.includes("ciudadano_bd.html"))
    {
        document.getElementById("btn-agregar")?.addEventListener("click", RecPrimerParcial.Manejadora.AgregarCiudadanoBD);
        document.getElementById("btn-mostrar")?.addEventListener("click", RecPrimerParcial.Manejadora.ListarCiudadanoBD);
        document.getElementById("btn-modificar")?.addEventListener("click", RecPrimerParcial.Manejadora.AsignarModificarCiudadano);
    }
    else
    {
        RecPrimerParcial.ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
        document.getElementById("btn-agregar")?.addEventListener("click", RecPrimerParcial.ManejadoraCiudadanoFotos.AgregarCiudadanoFotoBD);
        document.getElementById("btn-modificar")?.addEventListener("click", RecPrimerParcial.ManejadoraCiudadanoFotos.AsignarModificarCiudadanoFotoBD);
    }
 
});