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
exports.Income = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let Income = class Income {
    constructor() {
        this.id = 0;
        this.description = '';
        this.amount = 0;
    }
};
exports.Income = Income;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Income.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Income.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Income.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.incomes),
    __metadata("design:type", User_1.User)
], Income.prototype, "user", void 0);
exports.Income = Income = __decorate([
    (0, typeorm_1.Entity)()
], Income);
