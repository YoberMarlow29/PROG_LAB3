/*
● pathFoto(cadena)
*/
/// <reference path="auto.ts" />
namespace VasquezPanduro{

    export class AutoBD extends Auto{

        public pathFoto:string;

        public constructor(patente:string,marca:string,color:string,precio:number,pathFoto:string){

            super(patente,marca,color,precio);
            this.pathFoto=pathFoto;

        }

        public ToString(){

            return super.ToString()+",pathFoto: " + this.pathFoto;
        }
    
        public ToJson() {
            
            return  "{" + this.ToString + '}';
        }
    }
}