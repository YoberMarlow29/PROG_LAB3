"use strict";
/// <reference path="./ajax.ts"/>
var RecPrimerParcial;
(function (RecPrimerParcial) {
    class ManejadoraCiudadanoFotos {
        static MostrarCiudadanoFotosBD() {
            let ajax = new Ajax();
            ajax.Get("http://localhost:2023/listarCiudadanoFotosBD", (resultado) => {
                let div = document.getElementById("divTablaCiudadanoFotos");
                //div.textContent = "";
                console.clear();
                console.log(resultado);
                let ciudadanos = JSON.parse(resultado);
                if (ciudadanos !== null) {
                    let tabla = "<table><thead><tr><th>CIUDAD</th><th>EMAIL</th><th>CLAVE</th><th>FOTO</th></tr></thead><tbody>";
                    for (let ciudadano of ciudadanos) {
                        tabla += '<tr><td>' + ciudadano.ciudad + '</td><td>' + ciudadano.email + '</td><td>';
                        tabla += '</td><td>' + ciudadano.clave + '</td><td>' + `<img src="http://localhost:2023/${ciudadano.foto}" width="50px" hight="50px">` + '</td>';
                        tabla += `<td><input type="button" value="Modificar" class="btn btn-info id="" data-obj=${JSON.stringify(ciudadano)} name="btnModificar"><span class="bi bi-pencil"></span></input></td>`;
                        tabla += `<td><input type="button" value="Eliminar" class="btn btn-danger id="" data-obj='${JSON.stringify(ciudadano)}' name="btnEliminar"><span class="bi bi-x-circle"></span></input></td></tr>`;
                    }
                    tabla += "</tbody></table>";
                    div.innerHTML = tabla;
                    document.getElementsByName("btnModificar").forEach((boton) => {
                        boton.addEventListener("click", () => {
                            let obj = boton.getAttribute("data-obj");
                            new ManejadoraCiudadanoFotos().ModificarCiudadanoFotoBD(obj);
                        });
                    });
                    document.getElementsByName("btnEliminar").forEach((boton) => {
                        boton.addEventListener("click", () => {
                            let obj = boton.getAttribute("data-obj");
                            new ManejadoraCiudadanoFotos().EliminarCiudadanoFotoBD(obj);
                        });
                    });
                }
            });
        }
        static AgregarCiudadanoFotoBD() {
            let ajax = new Ajax();
            let ciudad = document.getElementById("ciudad").value;
            let email = document.getElementById("email").value;
            let clave = document.getElementById("clave").value;
            let foto = document.getElementById("foto");
            let form = new FormData();
            form.append("ciudad", ciudad);
            form.append("email", email);
            form.append("clave", clave);
            form.append("foto", foto.files[0]);
            ajax.Post("http://localhost:2023/agregarCiudadanoFotoBD", (resultado) => {
                let retParseado = JSON.parse(resultado);
                alert(retParseado.mensaje);
                console.log(retParseado.mensaje);
                document.getElementById("ciudad").value = "";
                document.getElementById("ciudad").readOnly = false;
                document.getElementById("email").value = "";
                document.getElementById("clave").value = "";
                document.getElementById("imgFoto").src = "";
                ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
            }, form, ManejadoraCiudadanoFotos.Fail);
        }
        ModificarCiudadanoFotoBD(param) {
            let ciudadano = JSON.parse(param);
            document.getElementById("ciudad").value = ciudadano.patente;
            document.getElementById("ciudad").readOnly = true;
            document.getElementById("email").value = ciudadano.marca;
            document.getElementById("clave").value = ciudadano.color;
            document.getElementById("imgFoto").src = "http://localhost:2023/" + ciudadano.foto;
        }
        EliminarCiudadanoFotoBD(param) {
            let ciudadano = JSON.parse(param);
            if (confirm(`Seguro de eliminar el ciudadano: ${ciudadano.ciudad} - ${ciudadano.email}?`)) {
                let ajax = new Ajax();
                let header = [{ "key": "content-type", "value": "application/json" }];
                let params = `{"ciudad":"${ciudadano.ciudad}"}`;
                ajax.Post("http://localhost:2023/eliminarCiudadanoBD", (resultado) => {
                    let retParseado = JSON.parse(resultado);
                    console.clear();
                    console.log(retParseado.mensaje);
                    alert(retParseado.mensaje);
                    ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
                }, params, ManejadoraCiudadanoFotos.Fail, header);
            }
        }
        static AsignarModificarCiudadanoFotoBD() {
            let ajax = new Ajax();
            let ciudad = document.getElementById("ciudad").value;
            let email = document.getElementById("email").value;
            let clave = document.getElementById("clave").value;
            let foto = document.getElementById("foto");
            let form = new FormData();
            let ciudadano = new Pazos.Ciudadano(ciudad, email, clave);
            form.append("ciudadanoFoto_json", ciudadano.ToJSON());
            form.append("foto", foto.files[0]);
            ajax.Post("http://localhost:2023/modificarCiudadanoFotoBD", (resultado) => {
                let retParseado = JSON.parse(resultado);
                alert(retParseado.mensaje);
                console.log(retParseado.mensaje);
                ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
                document.getElementById("patente").value = "";
                document.getElementById("patente").readOnly = false;
                document.getElementById("marca").value = "";
                document.getElementById("color").value = "";
                document.getElementById("precio").value = "";
                document.getElementById("imgFoto").src = "../vistas_rpp/ciudadano_default.jpg";
            }, form, ManejadoraCiudadanoFotos.Fail);
        }
        static Fail(retorno) {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
    }
    RecPrimerParcial.ManejadoraCiudadanoFotos = ManejadoraCiudadanoFotos;
})(RecPrimerParcial || (RecPrimerParcial = {}));
//# sourceMappingURL=manejadoraCiudadanoFoto.js.map