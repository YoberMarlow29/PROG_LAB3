"use strict";
/// <reference path="auto.ts" />
/// <reference path="ajax.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    class ManejadoraAutoBD {
        //PARTE2
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static AgregarAutoBD() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let form = new FormData();
            let info = '{"marca":"' + marca + '","color":"' + color + '","precio":"' + precio + '","patente":"' + patente + '"}';
            form.append('auto_json', info);
            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/agregarAutoSinFoto.php", ManejadoraAutoBD.AgregarSuccess, form, ManejadoraAutoBD.Fail);
        }
        static AgregarSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Agregar: ", respuesta.mensaje);
            ManejadoraAutoBD.ListarAutosBD();
            alert("Agregar:" + respuesta.mensaje);
        }
        static ListarAutosBD() {
            ManejadoraAutoBD.AJAX.Get(ManejadoraAutoBD.URL_API + "BACKEND/listadoAutosBD.php", ManejadoraAutoBD.ListarAutosBDSuccess, "tabla=mostrar", ManejadoraAutoBD.Fail);
        }
        static ListarAutosBDSuccess(retorno) {
            let div = document.getElementById("divTabla");
            div.innerHTML = retorno;
            document.getElementsByName("btnModificar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let obj = boton.getAttribute("data-obj");
                    let obj_dato = JSON.parse(obj);
                    console.log(obj_dato);
                    document.getElementById("patente").value = obj_dato.patente;
                    document.getElementById("marca").value = obj_dato.marca;
                    document.getElementById("color").value = obj_dato.color;
                    document.getElementById("precio").value = obj_dato.precio;
                    let btn = document.getElementById("btn-modificar");
                    if (obj_dato.pathFoto !== "sin foto") {
                        const previsualizacion = document.getElementById("imgFoto");
                        previsualizacion.src = "./BACKEND/autos/imagenes/" + obj_dato.pathFoto;
                    }
                    btn.addEventListener("click", () => {
                        ManejadoraAutoBD.ModificarAuto();
                    });
                });
            });
            document.getElementsByName("btnEliminar").forEach((boton) => {
                boton.addEventListener("click", () => {
                    let obj = boton.getAttribute("data-obj");
                    let obj_dato = JSON.parse(obj);
                    let patente = obj_dato.patente;
                    if (confirm(`¿Seguro de eliminar el auto con la patente ${patente}?`)) {
                        let form = new FormData();
                        if (obj_dato.pathFoto == "sin foto") {
                            form.append('auto_json', JSON.stringify(obj_dato));
                            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/eliminarAutoBD.php", ManejadoraAutoBD.EliminarAutoBD, form, ManejadoraAutoBD.Fail);
                        }
                        else {
                            form.append('auto_json', JSON.stringify(obj_dato));
                            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/eliminarAutoBDFoto.php", ManejadoraAutoBD.EliminarAutoBD, form, ManejadoraAutoBD.Fail);
                        }
                    }
                });
            });
            console.log(retorno);
            alert(retorno);
        }
        static EliminarAutoBD(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);
            ManejadoraAutoBD.ListarAutosBD();
            alert("Eliminar:" + respuesta.mensaje);
        }
        static ModificarAuto() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let form = new FormData();
            let auto_json = '{"patente":"' + patente + '","marca":"' + marca + '","color":"' + color + '","precio":"' + precio + '"}';
            form.append('auto_json', auto_json);
            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/modificarAutoBD.php", ManejadoraAutoBD.ModificarAutoSuccess, form, ManejadoraAutoBD.Fail);
        }
        static ModificarAutoSuccess(retorno) {
            console.log(retorno);
            let respuesta = JSON.parse(retorno);
            console.log("Modificar: ", respuesta.mensaje);
            ManejadoraAutoBD.ListarAutosBD();
            alert("Modificar:" + respuesta.mensaje);
        }
    }
    ManejadoraAutoBD.URL_API = "./";
    ManejadoraAutoBD.AJAX = new PrimerParcial.Ajax();
    PrimerParcial.ManejadoraAutoBD = ManejadoraAutoBD;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadoraAutoBD.js.map