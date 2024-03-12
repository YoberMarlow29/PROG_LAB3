/// <reference path="auto.ts" />
/// <reference path="ajax.ts" />

namespace PrimerParcial{


    export class ManejadoraAutoBD{

        static URL_API : string = "./"; 
        static AJAX : Ajax = new Ajax();
        
//PARTE2

        public static Fail(retorno:string):void {
            
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }

        public static AgregarAutoBD() {
            let patente: string = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color: string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio:string = (<HTMLInputElement>document.getElementById("precio")).value;  
            let form: FormData = new FormData();

            let info: string = '{"marca":"' + marca + '","color":"' + color + '","precio":"' + precio + '","patente":"' + patente + '"}';
            form.append('auto_json', info);

            ManejadoraAutoBD.AJAX.Post(
                ManejadoraAutoBD.URL_API + "BACKEND/agregarAutoSinFoto.php",
                ManejadoraAutoBD.AgregarSuccess,
                form,
                ManejadoraAutoBD.Fail
            );
            
        }

        public static AgregarSuccess(retorno:string):void{
            let respuesta = JSON.parse(retorno);
            console.log("Agregar: ", respuesta.mensaje);        
            ManejadoraAutoBD.ListarAutosBD();
            alert("Agregar:"+respuesta.mensaje);
        }

        public static ListarAutosBD(){
            ManejadoraAutoBD.AJAX.Get(ManejadoraAutoBD.URL_API + "BACKEND/listadoAutosBD.php",
                        ManejadoraAutoBD.ListarAutosBDSuccess, 
                        "tabla=mostrar", 
                        ManejadoraAutoBD.Fail);         
        }

        public static ListarAutosBDSuccess(retorno:string):void {        
            let div = <HTMLDivElement>document.getElementById("divTabla");        
            div.innerHTML = retorno;  
            document.getElementsByName("btnModificar").forEach((boton)=>{
                boton.addEventListener("click", ()=>{ 
                    let obj : any = boton.getAttribute("data-obj");                
                    let obj_dato = JSON.parse(obj);
                    console.log(obj_dato);
                    (<HTMLInputElement>document.getElementById("patente")).value = obj_dato.patente;
                    (<HTMLInputElement>document.getElementById("marca")).value = obj_dato.marca;
                    (<HTMLInputElement>document.getElementById("color")).value = obj_dato.color;   
                    (<HTMLInputElement>document.getElementById("precio")).value = obj_dato.precio;                  
                    let btn = (<HTMLInputElement>document.getElementById("btn-modificar"));
                    if(obj_dato.pathFoto!=="sin foto"){
                           const previsualizacion = document.getElementById("imgFoto") as HTMLImageElement;
                           previsualizacion.src ="./BACKEND/autos/imagenes/"+obj_dato.pathFoto;                 
                         }
                    btn.addEventListener("click", ():void=>{
                        ManejadoraAutoBD.ModificarAuto();      
                    });
                });
            });
            
            document.getElementsByName("btnEliminar").forEach((boton)=>{
                boton.addEventListener("click", ()=>{ 
                    let obj : any = boton.getAttribute("data-obj");                
                    let obj_dato = JSON.parse(obj);
                    let patente : any = obj_dato.patente;
                              
                    if(confirm(`¿Seguro de eliminar el auto con la patente ${patente}?`)){                  
                        let form : FormData = new FormData()
                        if(obj_dato.pathFoto=="sin foto"){                        
                            form.append('auto_json', JSON.stringify(obj_dato));             
                            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/eliminarAutoBD.php", 
                            ManejadoraAutoBD.EliminarAutoBD, 
                                        form, 
                                        ManejadoraAutoBD.Fail);
                        }else{
                            form.append('auto_json', JSON.stringify(obj_dato));             
                            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/eliminarAutoBDFoto.php", 
                            ManejadoraAutoBD.EliminarAutoBD, 
                                        form, 
                                        ManejadoraAutoBD.Fail);
                        }
                    }                
                });
            }); 
            console.log(retorno);        
            alert(retorno);
        }  
        
        public static EliminarAutoBD(retorno:string):void {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);        
            ManejadoraAutoBD.ListarAutosBD();
            alert("Eliminar:"+respuesta.mensaje);
        }

        public static ModificarAuto(){

            let patente:string = (<HTMLInputElement>document.getElementById("patente")).value;               
            let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color:string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio:string = (<HTMLInputElement>document.getElementById("precio")).value;                    
            let form : FormData = new FormData()
            let auto_json :string = '{"patente":"'+patente+'","marca":"'+marca+'","color":"'+color+'","precio":"'+precio+'"}';
            form.append('auto_json', auto_json);

            ManejadoraAutoBD.AJAX.Post(ManejadoraAutoBD.URL_API + "BACKEND/modificarAutoBD.php", 
                        ManejadoraAutoBD.ModificarAutoSuccess, 
                        form, 
                        ManejadoraAutoBD.Fail); 
            
        }
        public static ModificarAutoSuccess(retorno:string):void {
            console.log(retorno);
            let respuesta = JSON.parse(retorno);
            console.log("Modificar: ", respuesta.mensaje);        
            ManejadoraAutoBD.ListarAutosBD();
            alert("Modificar:"+respuesta.mensaje);
        }

        
    }

}