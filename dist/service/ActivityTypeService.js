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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const ActivityType_1 = require("../model/ActivityType");
const types_1 = require("../types/types");
let ActivityTypeServiceImpl = class ActivityTypeServiceImpl {
    getActivityType() {
        return __awaiter(this, void 0, void 0, function* () {
            const activityTypesMongo = yield this.ActivityTypeRepositoryMongo.findAll().then((a) => a.map((dto) => {
                return this.toActivityType(dto);
            }));
            const activityTypesDb = yield this.ActivityTypeRepositoryDb.findAll().then((a2) => a2.map((dto) => {
                return this.toActivityType(dto);
            }));
            return activityTypesDb;
        });
    }
    createActivityType(activityTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityTypeDTO = this.toActivityTypeDTO(activityTypeData);
            const createdDTO = yield this.ActivityTypeRepositoryMongo.createActivityType(activityTypeDTO);
            activityTypeDTO.mongoId = createdDTO._id;
            return this.ActivityTypeRepositoryDb.createActivityType(activityTypeDTO)
                .then(() => {
                return this.toActivityType(createdDTO);
            });
        });
    }
    updateActivityType(activityTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityTypeDTO = this.toActivityTypeDTO(activityTypeData);
            const updatedDTO = yield this.ActivityTypeRepositoryMongo.updateActivityType(activityTypeDTO);
            return this.ActivityTypeRepositoryDb.updateActivityType(activityTypeDTO)
                .then(() => {
                return this.toActivityType(updatedDTO);
            });
        });
    }
    deleteActivityType(activityTypeId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ActivityTypeRepositoryMongo.deleteActivityType(activityTypeId);
            return yield this.ActivityTypeRepositoryDb.deleteActivityType(activityTypeId);
        });
    }
    toActivityType(activityTypeDTO) {
        return new ActivityType_1.ActivityType(activityTypeDTO.activityType, activityTypeDTO.mongoId, activityTypeDTO._id.toString());
    }
    toActivityTypeDTO(activityType) {
        return {
            activityType: activityType.getActivityType,
            mongoId: activityType.getMongoId,
            _id: activityType.getId,
        };
    }
};
__decorate([
    inversify_1.inject(types_1.default.ActivityTypeNoSQLRepository),
    __metadata("design:type", Object)
], ActivityTypeServiceImpl.prototype, "ActivityTypeRepositoryMongo", void 0);
__decorate([
    inversify_1.inject(types_1.default.ActivityTypeSQLRepository),
    __metadata("design:type", Object)
], ActivityTypeServiceImpl.prototype, "ActivityTypeRepositoryDb", void 0);
ActivityTypeServiceImpl = __decorate([
    inversify_1.injectable()
], ActivityTypeServiceImpl);
exports.ActivityTypeServiceImpl = ActivityTypeServiceImpl;
//# sourceMappingURL=ActivityTypeService.js.map