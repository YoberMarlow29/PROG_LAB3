"use strict";
var Pazos;
(function (Pazos) {
    class CiudadanoFoto extends Pazos.Ciudadano {
        constructor(ciudad, email, clave, foto) {
            super(ciudad, email, clave);
            this.foto = foto;
        }
    }
    Pazos.CiudadanoFoto = CiudadanoFoto;
})(Pazos || (Pazos = {}));
//# sourceMappingURL=ciudadanoFoto.js.map