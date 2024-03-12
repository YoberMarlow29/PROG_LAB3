"use strict";
/*
● patente(cadena)
● marca(cadena)
● color(cadena)
● precio(flotante)
*/
var VasquezPanduro;
(function (VasquezPanduro) {
    class Auto {
        constructor(patente, marca, color, precio) {
            this.patente = patente;
            this.marca = marca;
            this.color = color;
            this.precio = precio;
        }
        ToString() {
            return "patente: " + this.patente + ",marca: " + this.marca + ",color: " + this.color + ",precio: " + this.precio;
        }
        ToJson() {
            return "{" + this.ToString + '}';
        }
    }
    VasquezPanduro.Auto = Auto;
})(VasquezPanduro || (VasquezPanduro = {}));
//# sourceMappingURL=auto.js.map