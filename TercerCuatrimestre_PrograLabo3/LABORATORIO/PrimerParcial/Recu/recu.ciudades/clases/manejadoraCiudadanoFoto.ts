/// <reference path="./ajax.ts"/>

namespace RecPrimerParcial
{
    export class ManejadoraCiudadanoFotos
    {
        public static MostrarCiudadanoFotosBD() : void
        {
            let ajax = new Ajax();

            ajax.Get("http://localhost:2023/listarCiudadanoFotosBD", (resultado:string)=>
            {
                let div = (<HTMLInputElement>document.getElementById("divTablaCiudadanoFotos"));
                //div.textContent = "";
                console.clear();
                console.log(resultado);

                let ciudadanos = JSON.parse(resultado);

                if(ciudadanos !== null)
                {
                    let tabla = "<table><thead><tr><th>CIUDAD</th><th>EMAIL</th><th>CLAVE</th><th>FOTO</th></tr></thead><tbody>";

                    for(let ciudadano of ciudadanos)
                    {
                        tabla += '<tr><td>' + ciudadano.ciudad + '</td><td>' + ciudadano.email + '</td><td>';
                        tabla += '</td><td>' + ciudadano.clave + '</td><td>' + `<img src="http://localhost:2023/${ciudadano.foto}" width="50px" hight="50px">` + '</td>';  
                        tabla += `<td><input type="button" value="Modificar" class="btn btn-info id="" data-obj=${JSON.stringify(ciudadano)} name="btnModificar"><span class="bi bi-pencil"></span></input></td>`;
                        tabla += `<td><input type="button" value="Eliminar" class="btn btn-danger id="" data-obj='${JSON.stringify(ciudadano)}' name="btnEliminar"><span class="bi bi-x-circle"></span></input></td></tr>`;  
                    }

                    tabla += "</tbody></table>";
                    div.innerHTML = tabla;

                    document.getElementsByName("btnModificar").forEach((boton)=>
                    {
                        boton.addEventListener("click", ()=>
                        {
                            let obj : any = boton.getAttribute("data-obj");
                            new ManejadoraCiudadanoFotos().ModificarCiudadanoFotoBD(obj);
                        });
                    });

                    document.getElementsByName("btnEliminar").forEach((boton)=>
                    {
                        boton.addEventListener("click", ()=>
                        {
                            let obj : any = boton.getAttribute("data-obj");
                            new ManejadoraCiudadanoFotos().EliminarCiudadanoFotoBD(obj);
                        });
                    });
                }
            });
        }

        public static AgregarCiudadanoFotoBD() : void
        {
            let ajax = new Ajax();
            let ciudad = (<HTMLInputElement>document.getElementById("ciudad")).value;
            let email = (<HTMLInputElement>document.getElementById("email")).value;
            let clave = (<HTMLInputElement>document.getElementById("clave")).value;
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));

            let form = new FormData();

            form.append("ciudad", ciudad);
            form.append("email", email);
            form.append("clave", clave);
            form.append("foto", foto.files[0]);

            ajax.Post("http://localhost:2023/agregarCiudadanoFotoBD", (resultado:string)=>
            {
                let retParseado = JSON.parse(resultado);
                alert(retParseado.mensaje);
                console.log(retParseado.mensaje);
                (<HTMLInputElement>document.getElementById("ciudad")).value = "";
                (<HTMLInputElement>document.getElementById("ciudad")).readOnly = false;
                (<HTMLInputElement>document.getElementById("email")).value = "";
                (<HTMLInputElement>document.getElementById("clave")).value = "";
                (<HTMLImageElement> document.getElementById("imgFoto")).src = "";
                ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
            }, form, ManejadoraCiudadanoFotos.Fail);
        }

        public ModificarCiudadanoFotoBD(param:string) : void
        {
            let ciudadano = JSON.parse(param);
            (<HTMLInputElement>document.getElementById("ciudad")).value = ciudadano.patente;
            (<HTMLInputElement>document.getElementById("ciudad")).readOnly = true;
            (<HTMLInputElement>document.getElementById("email")).value = ciudadano.marca;
            (<HTMLInputElement>document.getElementById("clave")).value = ciudadano.color;
            (<HTMLImageElement> document.getElementById("imgFoto")).src = "http://localhost:2023/"+ ciudadano.foto;
        }

        public EliminarCiudadanoFotoBD(param:string) : void
        {
            let ciudadano = JSON.parse(param);

            if(confirm(`Seguro de eliminar el ciudadano: ${ciudadano.ciudad} - ${ciudadano.email}?`))
            {
                let ajax = new Ajax();
                let header = [{"key": "content-type", "value": "application/json"}];
                let params = `{"ciudad":"${ciudadano.ciudad}"}`;

                ajax.Post("http://localhost:2023/eliminarCiudadanoBD", (resultado:string)=>
                {
                    let retParseado = JSON.parse(resultado);
                    console.clear();
                    console.log(retParseado.mensaje);
                    alert(retParseado.mensaje);
                    ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
                }, params, ManejadoraCiudadanoFotos.Fail, header);
            }   
        }

        public static AsignarModificarCiudadanoFotoBD()
        {
            let ajax = new Ajax();
            let ciudad = (<HTMLInputElement>document.getElementById("ciudad")).value;
            let email = (<HTMLInputElement>document.getElementById("email")).value;
            let clave = (<HTMLInputElement>document.getElementById("clave")).value;
   
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));
            let form = new FormData();
            let ciudadano = new Pazos.Ciudadano(ciudad, email, clave);
            form.append("ciudadanoFoto_json", ciudadano.ToJSON());
            form.append("foto", foto.files[0]);

            ajax.Post("http://localhost:2023/modificarCiudadanoFotoBD", (resultado:string)=>
            {
                let retParseado = JSON.parse(resultado);
                alert(retParseado.mensaje);
                console.log(retParseado.mensaje);
                ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
                (<HTMLInputElement>document.getElementById("patente")).value = "";
                (<HTMLInputElement>document.getElementById("patente")).readOnly = false;
                (<HTMLInputElement>document.getElementById("marca")).value = "";
                (<HTMLInputElement>document.getElementById("color")).value = "";
                (<HTMLInputElement>document.getElementById("precio")).value = "";
                (<HTMLImageElement> document.getElementById("imgFoto")).src = "../vistas_rpp/ciudadano_default.jpg";
            }, form, ManejadoraCiudadanoFotos.Fail);
        }

        private static Fail(retorno:string):void 
        {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
    }
}