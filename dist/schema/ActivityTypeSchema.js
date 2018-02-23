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
const iridium_1 = require("iridium");
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
let ActivityTypeMongoSchema = class ActivityTypeMongoSchema extends iridium_1.Instance {
};
__decorate([
    iridium_1.ObjectID,
    __metadata("design:type", String)
], ActivityTypeMongoSchema.prototype, "_id", void 0);
__decorate([
    iridium_1.Property(String, true),
    __metadata("design:type", String)
], ActivityTypeMongoSchema.prototype, "activityType", void 0);
ActivityTypeMongoSchema = __decorate([
    iridium_1.Collection('ActivityType')
], ActivityTypeMongoSchema);
exports.ActivityTypeMongoSchema = ActivityTypeMongoSchema;
class ActivityTypeDatabase extends iridium_1.Core {
    constructor() {
        super(...arguments);
        this.model = new iridium_1.Model(this, ActivityTypeMongoSchema);
    }
}
exports.ActivityTypesMongoDatabase = new ActivityTypeDatabase(config_1.default.mongo());
let ActivityTypeDbSchema = class ActivityTypeDbSchema {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", String)
], ActivityTypeDbSchema.prototype, "_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ActivityTypeDbSchema.prototype, "mongoId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ActivityTypeDbSchema.prototype, "activityType", void 0);
ActivityTypeDbSchema = __decorate([
    typeorm_1.Entity()
], ActivityTypeDbSchema);
exports.ActivityTypeDbSchema = ActivityTypeDbSchema;
//# sourceMappingURL=ActivityTypeSchema.js.map