"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const financeRoutes_1 = __importDefault(require("./financeRoutes"));
const routes = (0, express_1.Router)();
routes.use("/users", userRoutes_1.default);
routes.use("/finances", financeRoutes_1.default);
exports.default = routes;
