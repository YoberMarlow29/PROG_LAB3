"use strict";
/// <reference path="auto.ts" />
/// <reference path="ajax.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    class Manejadora {
        static AgregarAutoJSON() {
            let patente = document.getElementById("patente").value;
            let marca = document.getElementById("marca").value;
            let color = document.getElementById("color").value;
            let precio = parseFloat(document.getElementById("precio").value);
            let form = new FormData();
            form.append('patente', patente);
            form.append('marca', marca);
            form.append('color', color);
            form.append('precio', String(precio));
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaAutoJSON.php", Manejadora.AgregarSuccessJSON, form, Manejadora.Fail);
        }
        static AgregarSuccessJSON(retorno) {
            console.log("Agregar: ", retorno);
            Manejadora.ListarAutosJSON();
            alert("Agregar:" + retorno);
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
        static ListarAutosJSON() {
            Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/listadoAutosJSON.php", Manejadora.MostrarListadoSuccess, "", Manejadora.Fail);
        }
        static MostrarListadoSuccess(data) {
            let obj_array = JSON.parse(data);
            console.log("Mostrar: ", obj_array);
            let div = document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th>
                            </tr>`;
            if (obj_array.length < 1) {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;
            }
            else {
                for (let index = 0; index < obj_array.length; index++) {
                    const dato = obj_array[index];
                    tabla += `<tr><td>${dato.patente}</td><td>${dato.marca}</td><td>${dato.color}</td><td>${dato.precio}</td></tr>`;
                }
            }
            tabla += `</table>`;
            div.innerHTML = tabla;
        }
        static VerificarAutoJSON() {
            let patente = document.getElementById("patente").value;
            let form = new FormData();
            form.append('patente', patente);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/verificarAutoJSON.php", Manejadora.VerificarSuccess, form, Manejadora.Fail);
        }
        static VerificarSuccess(retorno) {
            let respuesta = JSON.parse(retorno);
            console.log("Verificar: ", respuesta.mensaje);
            Manejadora.ListarAutosJSON();
            alert("Verificar:" + respuesta.mensaje);
        }
    }
    Manejadora.URL_API = "./";
    Manejadora.AJAX = new PrimerParcial.Ajax();
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//# sourceMappingURL=manejadora.js.map