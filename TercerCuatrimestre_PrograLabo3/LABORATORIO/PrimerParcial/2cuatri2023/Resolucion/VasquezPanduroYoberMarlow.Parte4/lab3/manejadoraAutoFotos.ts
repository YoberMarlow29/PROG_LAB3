/// <reference path="auto.ts" />
/// <reference path="ajax.ts" />

window.addEventListener("load", ():void => {
    PrimerParcial.ManejadoraAutoFotos.MostrarAutos();
       
}); 


namespace PrimerParcial{


    export class ManejadoraAutoFotos{

        static URL_API : string = "./"; 
        static AJAX : Ajax = new Ajax();
        
        public static Fail(retorno:string):void {
            
            console.error(retorno);
            alert("Ha ocurrido un ERROR!!!");
        }

        public static AgregarAutoFotoBD() {
            let patente: string = (<HTMLInputElement>document.getElementById("patente")).value;
            let marca: string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color: string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio:string = (<HTMLInputElement>document.getElementById("precio")).value;  
            let foto: any = (<HTMLInputElement>document.getElementById("foto"));
            let form: FormData = new FormData();

            if (foto.files && foto.files[0]) {
                form.append('foto', foto.files[0]);
                form.append('marca', marca);
                form.append('color', color);
                form.append('precio', precio);
                form.append('patente', patente);

                ManejadoraAutoFotos.AJAX.Post(
                    ManejadoraAutoFotos.URL_API + "BACKEND/agregarAutoBD.php",
                    ManejadoraAutoFotos.AgregarSuccess,
                    form,
                    ManejadoraAutoFotos.Fail
                );
            }
        }

        public static AgregarSuccess(retorno:string):void{
            let respuesta = JSON.parse(retorno);
            console.log("Agregar: ", respuesta.mensaje);        
            ManejadoraAutoFotos.MostrarAutos();
            alert("Agregar:"+respuesta.mensaje);
        }

        public static MostrarAutos(){
            ManejadoraAutoFotos.AJAX.Get(ManejadoraAutoFotos.URL_API + "BACKEND/listadoAutosBD.php",
                        ManejadoraAutoFotos.MostrarAutosSuccess, 
                        "tabla=mostrar", 
                        ManejadoraAutoFotos.Fail);         
        }

        public static MostrarAutosSuccess(retorno:string):void {        
            let div = <HTMLDivElement>document.getElementById("divTablaAutoFotos");        
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
                        ManejadoraAutoFotos.ModificarAutoFotoBD();      
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
                            ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/eliminarAutoBD.php", 
                            ManejadoraAutoFotos.DeleteSuccess, 
                                        form, 
                                        ManejadoraAutoFotos.Fail);
                        }else{
                            form.append('auto_json', JSON.stringify(obj_dato));             
                            ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/eliminarAutoBDFoto.php", 
                            ManejadoraAutoFotos.DeleteSuccess, 
                                        form, 
                                        ManejadoraAutoFotos.Fail);
                        }
                    }                
                });
            }); 
            console.log(retorno);        
            alert(retorno);
        }  
        
        public static DeleteSuccess(retorno:string):void {
            let respuesta = JSON.parse(retorno);
            console.log("Eliminar: ", respuesta.mensaje);        
            ManejadoraAutoFotos.MostrarAutos();
            alert("Eliminar:"+respuesta.mensaje);
        }

        public static ModificarAutoFotoBD(){

            let patente:string = (<HTMLInputElement>document.getElementById("patente")).value;               
            let marca:string = (<HTMLInputElement>document.getElementById("marca")).value;
            let color:string = (<HTMLInputElement>document.getElementById("color")).value;
            let precio:string = (<HTMLInputElement>document.getElementById("precio")).value;                    
            let foto : any = (<HTMLInputElement> document.getElementById("foto"));    
            let form : FormData = new FormData()
            let auto_json :string = '{"patente":"'+patente+'","marca":"'+marca+'","color":"'+color+'","precio":"'+precio+'"}';
            form.append('auto_json', auto_json);
            if(foto.files && foto.files[0]){
                form.append('foto', foto.files[0]);
                ManejadoraAutoFotos.AJAX.Post(ManejadoraAutoFotos.URL_API + "BACKEND/modificarAutoBDFoto.php", 
                            ManejadoraAutoFotos.ModificarAutoSuccess, 
                            form, 
                            ManejadoraAutoFotos.Fail); 
            }
        }
        //btn-modificar
        public static ModificarAutoSuccess(retorno:string):void {
            console.log(retorno);
            let respuesta = JSON.parse(retorno);
            console.log("Modificar: ", respuesta.mensaje);        
            ManejadoraAutoFotos.MostrarAutos();
            alert("Modificar:"+respuesta.mensaje);
        }

        public static MostrarAutosPdf() {
            
            window.location.href = ManejadoraAutoFotos.URL_API + "BACKEND/listadoAutosPDF.php";
        }

        public static MostrarAutosBorrados(){
            ManejadoraAutoFotos.AJAX.Get(ManejadoraAutoFotos.URL_API + "BACKEND/eliminarAutoBDFoto.php", 
            ManejadoraAutoFotos.MostrarAutosBorradosSuccess, 
                        '', 
                        ManejadoraAutoFotos.Fail);
        }
        public static MostrarAutosBorradosSuccess(retorno:string):void {       
            let div = <HTMLDivElement>document.getElementById("divTablaAutoFotos");        
            div.innerHTML = retorno; 
            console.log(retorno);        
            alert(retorno);
        }  

        public static MostrarAutosModificados(){
            ManejadoraAutoFotos.AJAX.Get(ManejadoraAutoFotos.URL_API + "BACKEND/modificarAutoBDFoto.php", 
            ManejadoraAutoFotos.MostrarAutosModificadosSuccess, 
                        '', 
                        ManejadoraAutoFotos.Fail);
        }
        public static MostrarAutosModificadosSuccess(retorno:string):void {       
            let div = <HTMLDivElement>document.getElementById("divTablaAutoFotos");        
            div.innerHTML = retorno; 
            console.log(retorno);        
            alert(retorno);
        }

               
    }

}