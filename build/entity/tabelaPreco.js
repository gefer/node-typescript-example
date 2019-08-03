"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var TabelaPreco = /** @class */ (function () {
    function TabelaPreco() {
    }
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TabelaPreco.prototype, "tipoProcesso", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], TabelaPreco.prototype, "codItem", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TabelaPreco.prototype, "descItem", void 0);
    __decorate([
        typeorm_1.PrimaryColumn(),
        __metadata("design:type", String)
    ], TabelaPreco.prototype, "codTabela", void 0);
    __decorate([
        typeorm_1.Column({
            name: "valorTotal",
            type: "decimal",
            precision: 18,
            scale: 4
        }),
        __metadata("design:type", Number)
    ], TabelaPreco.prototype, "valorTotal", void 0);
    __decorate([
        typeorm_1.CreateDateColumn({ type: 'date' }),
        __metadata("design:type", Date)
    ], TabelaPreco.prototype, "dataVigencia", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], TabelaPreco.prototype, "unidMedida", void 0);
    __decorate([
        typeorm_1.Column({
            name: "valorFilme",
            type: "decimal",
            precision: 18,
            scale: 4
        }),
        __metadata("design:type", Number)
    ], TabelaPreco.prototype, "valorFilme", void 0);
    TabelaPreco = __decorate([
        typeorm_1.Entity()
    ], TabelaPreco);
    return TabelaPreco;
}());
exports.TabelaPreco = TabelaPreco;
//# sourceMappingURL=tabelaPreco.js.map