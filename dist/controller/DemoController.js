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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const inversify_1 = require("inversify");
const express = require("express");
const inversify_express_utils_1 = require("inversify-express-utils");
const Demo_1 = require("../model/Demo");
const types_1 = require("../types/types");
let DemoController = class DemoController extends BaseController_1.BaseController {
    constructor(demoService) {
        super();
        this.demoService = demoService;
    }
    getDemo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const demo = yield this.demoService.getDemo().catch(err => console.log(err));
            return this.renderJSON(req, res, { demo: demo });
        });
    }
    createDemo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const demoData = req.body.demo;
            let demos = new Demo_1.Demo(demoData.demo);
            let createdDemo;
            try {
                createdDemo = yield this.demoService.createDemo(demos);
            }
            catch (error) {
                return this.renderError(req, res, error);
            }
            this.renderJSON(req, res, { demo: createdDemo }, 201);
        });
    }
    updateDemo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const demoData = req.body.demo;
            let id = req.params.id;
            let demo = new Demo_1.Demo(demoData.demo, id);
            const updatedDemo = yield this.demoService.updateDemo(demo).catch(err => next(err));
            this.renderJSON(req, res, { Demo: updatedDemo }, 200);
        });
    }
    ;
    demoDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var demoid = req.params.demoId;
            const deletedDemo = yield this.demoService.deleteDemo(demoid).catch(err => console.log(err));
            return this.renderJSON(req, res, { places: deletedDemo }, 204);
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "getDemo", null);
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "createDemo", null);
__decorate([
    inversify_express_utils_1.httpPut('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "updateDemo", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:demoId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "demoDelete", null);
DemoController = __decorate([
    inversify_express_utils_1.controller('/demo'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.DemoService)),
    __metadata("design:paramtypes", [Object])
], DemoController);
exports.DemoController = DemoController;
//# sourceMappingURL=DemoController.js.map