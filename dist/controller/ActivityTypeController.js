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
const ActivityType_1 = require("../model/ActivityType");
const types_1 = require("../types/types");
let ActivityTypeController = class ActivityTypeController extends BaseController_1.BaseController {
    constructor(activityTypeService) {
        super();
        this.activityTypeService = activityTypeService;
    }
    getActivityType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityType = yield this.activityTypeService.getActivityType().catch(err => console.log(err));
            return this.renderJSON(req, res, { activityType: activityType });
        });
    }
    createActivityType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityTypeData = req.body.activityType;
            let activityTypes = new ActivityType_1.ActivityType(activityTypeData.activityType);
            let createdActivityType;
            try {
                createdActivityType = yield this.activityTypeService.createActivityType(activityTypes);
            }
            catch (error) {
                return this.renderError(req, res, error);
            }
            this.renderJSON(req, res, { activityType: createdActivityType }, 201);
        });
    }
    updateActivityType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityTypeData = req.body.activityType;
            let id = req.params.id;
            let activityType = new ActivityType_1.ActivityType(activityTypeData.activityType, id);
            const updatedActivityType = yield this.activityTypeService.updateActivityType(activityType).catch(err => next(err));
            this.renderJSON(req, res, { ActivityType: updatedActivityType }, 200);
        });
    }
    ;
    activityTypeDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var activityTypeid = req.params.activityTypeId;
            const deletedActivityType = yield this.activityTypeService.deleteActivityType(activityTypeid).catch(err => console.log(err));
            return this.renderJSON(req, res, { places: deletedActivityType }, 204);
        });
    }
};
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ActivityTypeController.prototype, "getActivityType", null);
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ActivityTypeController.prototype, "createActivityType", null);
__decorate([
    inversify_express_utils_1.httpPut('/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ActivityTypeController.prototype, "updateActivityType", null);
__decorate([
    inversify_express_utils_1.httpDelete('/:activityTypeId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ActivityTypeController.prototype, "activityTypeDelete", null);
ActivityTypeController = __decorate([
    inversify_express_utils_1.controller('/activityType'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.ActivityTypeService)),
    __metadata("design:paramtypes", [Object])
], ActivityTypeController);
exports.ActivityTypeController = ActivityTypeController;
//# sourceMappingURL=ActivityTypeController.js.map