/// <reference path="auto.ts" />
/// <reference path="ajax.ts" />


namespace PrimerParcial{


    export class Manejadora{

        static URL_API : string = "./"; 
        static AJAX : Ajax = new Ajax();
       
        public static AgregarAutoJSON(){

            let patente:string = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color:string = (<HTMLInputElement>document.getElementById("color")).value;      
            let precio:number = parseFloat((<HTMLInputElement>document.getElementById("precio")).value);  
            
            let form : FormData = new FormData()

            form.append('patente', patente);
            form.append('marca', marca);
            form.append('color', color);
            form.append('precio', String(precio));

            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/AltaAutoJSON.php", 
            Manejadora.AgregarSuccessJSON, 
            form, 
            Manejadora.Fail); 
    

        }

        public static AgregarSuccessJSON(retorno:string):void {
            console.log("Agregar: ", retorno);        
            Manejadora.ListarAutosJSON();
            alert("Agregar:"+retorno);
        }
        public static Fail(retorno:string):void {
    
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }

        public static ListarAutosJSON()
        {       
            Manejadora.AJAX.Get(Manejadora.URL_API + "BACKEND/listadoAutosJSON.php", 
                        Manejadora.MostrarListadoSuccess, 
                        "", 
                        Manejadora.Fail); 
        }

        public static MostrarListadoSuccess(data:string):void {

            let obj_array: any[] = JSON.parse(data);

            console.log("Mostrar: ", obj_array);
            let div = <HTMLDivElement>document.getElementById("divTabla");
            let tabla = `<table class="table table-hover">
                            <tr>
                                <th>PATENTE</th><th>MARCA</th><th>COLOR</th><th>PRECIO</th>
                            </tr>`;
            if (obj_array.length < 1) {
                tabla += `<tr><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;
            } else {
                for (let index = 0; index < obj_array.length; index++) {
                    const dato = obj_array[index];
                    tabla += `<tr><td>${dato.patente}</td><td>${dato.marca}</td><td>${dato.color}</td><td>${dato.precio}</td></tr>`;
                }
            }
            tabla += `</table>`;
            div.innerHTML = tabla;          
        }

        public static VerificarAutoJSON(){
            let patente:string = (<HTMLInputElement>document.getElementById("patente")).value;
            let form : FormData = new FormData()
            form.append('patente', patente);
            Manejadora.AJAX.Post(Manejadora.URL_API + "BACKEND/verificarAutoJSON.php", 
                        Manejadora.VerificarSuccess, 
                        form, 
                        Manejadora.Fail); 
        }
        public static VerificarSuccess(retorno:string):void {
            let respuesta = JSON.parse(retorno);
            console.log("Verificar: ", respuesta.mensaje);        
            Manejadora.ListarAutosJSON();
            alert("Verificar:"+respuesta.mensaje);
        } 
        
    }

}