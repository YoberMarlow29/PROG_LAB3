"use strict";
/// <reference path="./clases/manejadora.ts"/>
/// <reference path="./clases/manejadoraCiudadanoFoto.ts"/>
window.addEventListener("load", () => {
    var _a, _b, _c, _d, _e;
    if (window.location.pathname.includes("ciudadano_bd.html")) {
        (_a = document.getElementById("btn-agregar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", RecPrimerParcial.Manejadora.AgregarCiudadanoBD);
        (_b = document.getElementById("btn-mostrar")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", RecPrimerParcial.Manejadora.ListarCiudadanoBD);
        (_c = document.getElementById("btn-modificar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", RecPrimerParcial.Manejadora.AsignarModificarCiudadano);
    }
    else {
        RecPrimerParcial.ManejadoraCiudadanoFotos.MostrarCiudadanoFotosBD();
        (_d = document.getElementById("btn-agregar")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", RecPrimerParcial.ManejadoraCiudadanoFotos.AgregarCiudadanoFotoBD);
        (_e = document.getElementById("btn-modificar")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", RecPrimerParcial.ManejadoraCiudadanoFotos.AsignarModificarCiudadanoFotoBD);
    }
});
//# sourceMappingURL=script.js.map