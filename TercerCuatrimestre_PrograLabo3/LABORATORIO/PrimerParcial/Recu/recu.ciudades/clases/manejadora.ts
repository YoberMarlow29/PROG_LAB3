/// <reference path="./ajax.ts"/>
/// <reference path="./ciudadano.ts"/>

namespace RecPrimerParcial
{
    export class Manejadora
    {
        public static AgregarCiudadanoBD() : void
        {
            let ajax = new Ajax();
            let ciudad = (<HTMLInputElement>document.getElementById("ciudad")).value;
            let email = (<HTMLInputElement>document.getElementById("email")).value;
            let clave = (<HTMLInputElement>document.getElementById("clave")).value;
            
            let header = [{"key": "content-type", "value": "application/json"}];
            let ciudadano: Pazos.Ciudadano = new Pazos.Ciudadano(ciudad, email, clave);

            ajax.Post("http://localhost:2023/agregarCiudadanoBD", (resultado:string)=>
            {
                let retParseado = JSON.parse(resultado);
                alert(retParseado.mensaje);
            }, ciudadano.ToJSON(), Manejadora.Fail, header);
        }

        public static ListarCiudadanoBD() : void
        {
            let ajax = new Ajax();

            ajax.Get("http://localhost:2023/listarCiudadanoBD", (resultado:string)=>
            {
                let div = (<HTMLInputElement>document.getElementById("divTabla"));
                div.textContent = "";
                console.clear();
                console.log(resultado);

                let ciudadanos = JSON.parse(resultado);

                if(ciudadanos !== null)
                {
                    let tabla = "<table><thead><tr><th>CIUDAD</th><th>EMAIL</th><th>CLAVE</th></tr></thead><tbody>";

                    for(let ciudadano of ciudadanos)
                    {
                        tabla += '<tr><td>' + ciudadano.ciudad + '</td><td>' + ciudadano.email + '</td><td>' + '</td><td>' + ciudadano.clave + '</td>'; 
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
                            Manejadora.ModificarCiudadano(obj);
                        });
                    });

                    document.getElementsByName("btnEliminar").forEach((boton)=>
                    {
                        boton.addEventListener("click", ()=>
                        {
                            let obj : any = boton.getAttribute("data-obj");
                            let ciudadano = JSON.parse(obj);
                            Manejadora.EliminarCiudadanoBD(ciudadano);
                        });
                    });
                }
            });
        }

        private static ModificarCiudadano(param:any) : void
        {
            let ciudadano = JSON.parse(param);
            (<HTMLInputElement>document.getElementById("ciudad")).value = ciudadano.ciudad;
            (<HTMLInputElement>document.getElementById("ciudad")).readOnly = true;
            (<HTMLInputElement>document.getElementById("email")).value = ciudadano.email;
            (<HTMLInputElement>document.getElementById("clave")).value = ciudadano.clave;
        }

        private static EliminarCiudadanoBD(param:any) : void
        {
            if(confirm(`Seguro de eliminar el ciudadano: ${param.ciudad} - ${param.email}?`))
            {
                let ajax = new Ajax();
                let header = [{"key": "content-type", "value": "application/json"}];
                let ciudadano: Pazos.Ciudadano = new Pazos.Ciudadano(param.ciudad, param.email, param.clave);

                ajax.Post("http://localhost:2023/eliminarCiudadanoBD", (resultado:string)=>
                {
                    let retParseado = JSON.parse(resultado);
                    console.clear();
                    console.log(retParseado.mensaje);
                    alert(retParseado.mensaje);
                    Manejadora.ListarCiudadanoBD();
                }, ciudadano.ToJSON(), Manejadora.Fail, header);
            }   
        }

        public static AsignarModificarCiudadano() : void
        {
            let ajax = new Ajax();
            let ciudad = (<HTMLInputElement>document.getElementById("ciudad")).value;
            let email = (<HTMLInputElement>document.getElementById("email")).value;
            let clave = (<HTMLInputElement>document.getElementById("clave")).value;
  
            let header = [{"key": "content-type", "value": "application/json"}];
            let auto: Pazos.Ciudadano  = new Pazos.Ciudadano (ciudad, email, clave);


            ajax.Post("http://localhost:2023/modificarAutoBD", (resultado:string)=>
            {
                let retParseado = JSON.parse(resultado);
                console.clear();
                console.log(retParseado.mensaje);
                alert(retParseado.mensaje);
                Manejadora.ListarCiudadanoBD();
                (<HTMLInputElement>document.getElementById("ciudad")).value = "";
                (<HTMLInputElement>document.getElementById("ciudad")).readOnly = false;
                (<HTMLInputElement>document.getElementById("email")).value = "";
                (<HTMLInputElement>document.getElementById("clave")).value = "";

            }, auto.ToJSON(), Manejadora.Fail, header);
        }
        
        private static Fail(retorno:string):void 
        {
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }
    }
}