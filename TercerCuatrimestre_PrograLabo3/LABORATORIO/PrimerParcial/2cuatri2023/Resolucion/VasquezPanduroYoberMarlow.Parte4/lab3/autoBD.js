"use strict";
/*
● pathFoto(cadena)
*/
/// <reference path="auto.ts" />
var VasquezPanduro;
(function (VasquezPanduro) {
    class AutoBD extends VasquezPanduro.Auto {
        constructor(patente, marca, color, precio, pathFoto) {
            super(patente, marca, color, precio);
            this.pathFoto = pathFoto;
        }
        ToString() {
            return super.ToString() + ",pathFoto: " + this.pathFoto;
        }
        ToJson() {
            return "{" + this.ToString + '}';
        }
    }
    VasquezPanduro.AutoBD = AutoBD;
})(VasquezPanduro || (VasquezPanduro = {}));
//# sourceMappingURL=autoBD.js.map