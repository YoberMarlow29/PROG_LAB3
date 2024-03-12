"use strict";
/// <reference path="auto.ts" />
/// <reference path="ajax.ts" />
window.addEventListener("load", () => {
    PrimerParcial.ManejadoraAutoFotos.MostrarAutos();
});
var PrimerParcial;
(function (PrimerParcial) {
    class ManejadoraAutoFotos {
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static AgregarAutoFotoBD() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let foto = document.getElementById("foto");
            let form = new FormData();
            if (foto.files && foto.files[0]) {
                form.append('foto', foto.files[0]);
                form.append('marca', marca);
                form.append('color', color);
                form.append('precio', precio);
                form.append('patente', patente);
                ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/agregarAutoBD.php", ManejadoraAutoFotos.AgregarSuccess, form, ManejadoraAutoFotos.Fail);
            }
        }
        static AgregarSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Agregar: ", respuesta.mensaje);
            ManejadoraAutoFotos.MostrarAutos();
            alert("Agregar:" + respuesta.mensaje);
        }
        static MostrarAutos() {
            ManejadoraAutoFotos.AJAX.Get(ManejadoraAutoFotos.URL_API + "BACKEND/listadoAutosBD.php", ManejadoraAutoFotos.MostrarAutosSuccess, "tabla=mostrar", ManejadoraAutoFotos.Fail);
        }
        static MostrarAutosSuccess(retorno) {
            let div = document.getElementById("divTablaAutoFotos");
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
                        ManejadoraAutoFotos.ModificarAutoFotoBD();
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
                            ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/eliminarAutoBD.php", ManejadoraAutoFotos.DeleteSuccess, form, ManejadoraAutoFotos.Fail);
                        }
                        else {
                            form.append('auto_json', JSON.stringify(obj_dato));
                            ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/eliminarAutoBDFoto.php", ManejadoraAutoFotos.DeleteSuccess, form, ManejadoraAutoFotos.Fail);
                        }
                    }
                });
            });
            console.log(retorno);
            alert(retorno);
        }
        static DeleteSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);
            ManejadoraAutoFotos.MostrarAutos();
            alert("Eliminar:" + respuesta.mensaje);
        }
        static ModificarAutoFotoBD() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = document.getElementById("precio").value;
            let foto = document.getElementById("foto");
            let form = new FormData();
            let auto_json = '{"patente":"' + patente + '","marca":"' + marca + '","color":"' + color + '","precio":"' + precio + '"}';
            form.append('auto_json', auto_json);
            if (foto.files && foto.files[0]) {
                form.append('foto', foto.files[0]);
                ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/modificarAutoBDFoto.php", ManejadoraAutoFotos.ModificarAutoSuccess, form, ManejadoraAutoFotos.Fail);
            }
        }
        //btn-modificar
        static ModificarAutoSuccess(retorno) {
            console.log(retorno);
            let respuesta = JSON.parse(retorno);
            console.log("Modificar: ", respuesta.mensaje);
            ManejadoraAutoFotos.MostrarAutos();
            alert("Modificar:" + respuesta.mensaje);
        }
        static MostrarAutosPdf() {
            window.location.href = ManejadoraAutoFotos.URL_API + "BACKEND/listadoAutosPDF.php";
        }
        static MostrarAutosBorrados() {
            ManejadoraAutoFotos.AJAX.Get(ManejadoraAutoFotos.URL_API + "BACKEND/eliminarAutoBDFoto.php", ManejadoraAutoFotos.MostrarAutosBorradosSuccess, '', ManejadoraAutoFotos.Fail);
        }
        static MostrarAutosBorradosSuccess(retorno) {
            let div = document.getElementById("divTablaAutoFotos");
            div.innerHTML = retorno;
            console.log(retorno);
            alert(retorno);
        }
        static MostrarAutosModificados() {
            ManejadoraAutoFotos.AJAX.Get(ManejadoraAutoFotos.URL_API + "BACKEND/modificarAutoBDFoto.php", ManejadoraAutoFotos.MostrarAutosModificadosSuccess, '', ManejadoraAutoFotos.Fail);
        }
        static MostrarAutosModificadosSuccess(retorno) {
            let div = document.getElementById("divTablaAutoFotos");
            div.innerHTML = retorno;
            console.log(retorno);
            alert(retorno);
        }
    }
    ManejadoraAutoFotos.URL_API = "./";
    ManejadoraAutoFotos.AJAX = new PrimerParcial.Ajax();
    PrimerParcial.ManejadoraAutoFotos = ManejadoraAutoFotos;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadoraAutoFotos.js.map