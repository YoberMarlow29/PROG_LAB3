namespace Pazos
{
    export class Ciudadano
    {
        public ciudad : string;
        public email : string;
        public clave : string;

        public constructor(ciudad : string, email : string, clave : string)
        {
            this.ciudad = ciudad;
            this.email = email;
            this.clave = clave;
        }

        public ToJSON() : string
        {
            return `{"ciudad":"${this.ciudad}","email":"${this.email}","clave":"${this.clave}"}`;
        }
    }
}