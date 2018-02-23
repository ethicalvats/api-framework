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
const BaseRepository_1 = require("./BaseRepository");
const ActivityTypeSchema_1 = require("../schema/ActivityTypeSchema");
const CONNECTION_NAME = 'activityType';
let ActivityTypeRepositoryMongo = class ActivityTypeRepositoryMongo {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const ActivityTypeDTOs = yield ActivityTypeSchema_1.ActivityTypesMongoDatabase.connect().then(() => ActivityTypeSchema_1.ActivityTypesMongoDatabase.model.find());
            return ActivityTypeDTOs.toArray();
        });
    }
    createActivityType(activityTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ActivityTypeSchema_1.ActivityTypesMongoDatabase.connect().then(() => {
                return ActivityTypeSchema_1.ActivityTypesMongoDatabase.model.insert(activityTypeData);
            });
        });
    }
    updateActivityType(activityTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = yield ActivityTypeSchema_1.ActivityTypesMongoDatabase.connect().then(() => ActivityTypeSchema_1.ActivityTypesMongoDatabase.model.findOne(activityTypeData.mongoId));
            dto.activityType = activityTypeData.activityType;
            const saved = yield dto.save((err, a) => {
                return a;
            });
            return saved;
        });
    }
    deleteActivityType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ActivityTypeSchema_1.ActivityTypesMongoDatabase.connect().then(() => {
                return ActivityTypeSchema_1.ActivityTypesMongoDatabase.model.remove({ _id: id });
            });
        });
    }
};
ActivityTypeRepositoryMongo = __decorate([
    inversify_1.injectable()
], ActivityTypeRepositoryMongo);
exports.ActivityTypeRepositoryMongo = ActivityTypeRepositoryMongo;
let ActivityTypeRepositoryDb = class ActivityTypeRepositoryDb extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
    }
    _setRepository(connection) {
        this.activityTypeRepository = connection.getRepository(ActivityTypeSchema_1.ActivityTypeDbSchema);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let records;
            yield this.activityTypeRepository.find()
                .then((data) => {
                if (data) {
                    records = data;
                    this.disconnect(conn);
                }
                else {
                    this.disconnect(conn);
                }
            }).catch(err => {
                this.disconnect(conn);
            });
            return records;
        });
    }
    createActivityType(activityTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityTypeInstance = new ActivityTypeSchema_1.ActivityTypeDbSchema();
            activityTypeInstance.activityType = activityTypeData.activityType;
            activityTypeInstance.mongoId = activityTypeData.mongoId;
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let records;
            yield this.activityTypeRepository.save(activityTypeInstance)
                .then((data) => {
                if (data) {
                    records = data;
                    this.disconnect(conn);
                }
                else {
                    this.disconnect(conn);
                }
            }).catch(err => {
                this.disconnect(conn);
            });
            return records;
        });
    }
    updateActivityType(activityTypeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let activityTypeRecord = yield this.activityTypeRepository.findOne({ mongoId: activityTypeData.mongoId });
            activityTypeRecord.activityType = activityTypeData.activityType;
            let records;
            yield this.activityTypeRepository.persist(activityTypeRecord).then((data) => {
                if (data) {
                    records = data;
                    this.disconnect(conn);
                }
                else {
                    this.disconnect(conn);
                }
            }).catch(err => {
                this.disconnect(conn);
            });
            return records;
        });
    }
    deleteActivityType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let deleteActivityType = yield this.activityTypeRepository.findOne({ mongoId: id });
            yield this.activityTypeRepository.remove(deleteActivityType).then((data) => {
                if (data) {
                    this.disconnect(conn);
                }
                else {
                    this.disconnect(conn);
                }
            }).catch(err => {
                this.disconnect(conn);
            });
            return parseInt(deleteActivityType._id);
        });
    }
};
ActivityTypeRepositoryDb = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ActivityTypeRepositoryDb);
exports.ActivityTypeRepositoryDb = ActivityTypeRepositoryDb;
//# sourceMappingURL=ActivityTypeRepository.js.map