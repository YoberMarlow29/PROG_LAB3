"use strict";
/// <reference path="./ajax.ts"/>
/// <reference path="./ciudadano.ts"/>
var RecPrimerParcial;
(function (RecPrimerParcial) {
    class Manejadora {
        static AgregarCiudadanoBD() {
            let ajax = new Ajax();
            let ciudad = document.getElementById("ciudad").value;
            let email = document.getElementById("email").value;
            let clave = document.getElementById("clave").value;
            let header = [{ "key": "content-type", "value": "application/json" }];
            let ciudadano = new Pazos.Ciudadano(ciudad, email, clave);
            ajax.Post("http://localhost:2023/agregarCiudadanoBD", (resultado) => {
                let retParseado = JSON.parse(resultado);
                alert(retParseado.mensaje);
            }, ciudadano.ToJSON(), Manejadora.Fail, header);
        }
        static ListarCiudadanoBD() {
            let ajax = new Ajax();
            ajax.Get("http://localhost:2023/listarCiudadanoBD", (resultado) => {
                let div = document.getElementById("divTabla");
                div.textContent = "";
                console.clear();
                console.log(resultado);
                let ciudadanos = JSON.parse(resultado);
                if (ciudadanos !== null) {
                    let tabla = "<table><thead><tr><th>CIUDAD</th><th>EMAIL</th><th>CLAVE</th></tr></thead><tbody>";
                    for (let ciudadano of ciudadanos) {
                        tabla += '<tr><td>' + ciudadano.ciudad + '</td><td>' + ciudadano.email + '</td><td>' + '</td><td>' + ciudadano.clave + '</td>';
                        tabla += `<td><input type="button" value="Modificar" class="btn btn-info id="" data-obj=${JSON.stringify(ciudadano)} name="btnModificar"><span class="bi bi-pencil"></span></input></td>`;
                        tabla += `<td><input type="button" value="Eliminar" class="btn btn-danger id="" data-obj='${JSON.stringify(ciudadano)}' name="btnEliminar"><span class="bi bi-x-circle"></span></input></td></tr>`;
                    }
                    tabla += "</tbody></table>";
                    div.innerHTML = tabla;
                    document.getElementsByName("btnModificar").forEach((boton) => {
                        boton.addEventListener("click", () => {
                            let obj = boton.getAttribute("data-obj");
                            Manejadora.ModificarCiudadano(obj);
                        });
                    });
                    document.getElementsByName("btnEliminar").forEach((boton) => {
                        boton.addEventListener("click", () => {
                            let obj = boton.getAttribute("data-obj");
                            let ciudadano = JSON.parse(obj);
                            Manejadora.EliminarCiudadanoBD(ciudadano);
                        });
                    });
                }
            });
        }
        static ModificarCiudadano(param) {
            let ciudadano = JSON.parse(param);
            document.getElementById("ciudad").value = ciudadano.ciudad;
            document.getElementById("ciudad").readOnly = true;
            document.getElementById("email").value = ciudadano.email;
            document.getElementById("clave").value = ciudadano.clave;
        }
        static EliminarCiudadanoBD(param) {
            if (confirm(`Seguro de eliminar el ciudadano: ${param.ciudad} - ${param.email}?`)) {
                let ajax = new Ajax();
                let header = [{ "key": "content-type", "value": "application/json" }];
                let ciudadano = new Pazos.Ciudadano(param.ciudad, param.email, param.clave);
                ajax.Post("http://localhost:2023/eliminarCiudadanoBD", (resultado) => {
                    let retParseado = JSON.parse(resultado);
                    console.clear();
                    console.log(retParseado.mensaje);
                    alert(retParseado.mensaje);
                    Manejadora.ListarCiudadanoBD();
                }, ciudadano.ToJSON(), Manejadora.Fail, header);
            }
        }
        static AsignarModificarCiudadano() {
            let ajax = new Ajax();
            let ciudad = document.getElementById("ciudad").value;
            let email = document.getElementById("email").value;
            let clave = document.getElementById("clave").value;
            let header = [{ "key": "content-type", "value": "application/json" }];
            let auto = new Pazos.Ciudadano(ciudad, email, clave);
            ajax.Post("http://localhost:2023/modificarAutoBD", (resultado) => {
                let retParseado = JSON.parse(resultado);
                console.clear();
                console.log(retParseado.mensaje);
                alert(retParseado.mensaje);
                Manejadora.ListarCiudadanoBD();
                document.getElementById("ciudad").value = "";
                document.getElementById("ciudad").readOnly = false;
                document.getElementById("email").value = "";
                document.getElementById("clave").value = "";
            }, auto.ToJSON(), Manejadora.Fail, header);
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
    }
    RecPrimerParcial.Manejadora = Manejadora;
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=manejadora.js.map