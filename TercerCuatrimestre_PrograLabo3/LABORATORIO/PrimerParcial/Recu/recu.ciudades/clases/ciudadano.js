"use strict";
var Pazos;
(function (Pazos) {
    class Ciudadano {
        constructor(ciudad, email, clave) {
            this.ciudad = ciudad;
            this.email = email;
            this.clave = clave;
        }
        ToJSON() {
            return `{"ciudad":"${this.ciudad}","email":"${this.email}","clave":"${this.clave}"}`;
        }
    }
    Pazos.Ciudadano = Ciudadano;
})(Pazos || (Pazos = {}));
//# sourceMappingURL=ciudadano.js.map