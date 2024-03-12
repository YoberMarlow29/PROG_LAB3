namespace Pazos
{
    export class CiudadanoFoto extends Ciudadano
    {
        private foto : string;

        public constructor(ciudad : string, email : string, clave : string , foto : string)
        {
            super(ciudad, email, clave);
            this.foto = foto;
        }
    }
}