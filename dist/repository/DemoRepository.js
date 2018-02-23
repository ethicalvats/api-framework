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
const DemoSchema_1 = require("../schema/DemoSchema");
const CONNECTION_NAME = 'demo';
let DemoRepositoryMongo = class DemoRepositoryMongo {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const DemoDTOs = yield DemoSchema_1.DemosMongoDatabase.connect().then(() => DemoSchema_1.DemosMongoDatabase.model.find());
            return DemoDTOs.toArray();
        });
    }
    createDemo(demoData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DemoSchema_1.DemosMongoDatabase.connect().then(() => {
                return DemoSchema_1.DemosMongoDatabase.model.insert(demoData);
            });
        });
    }
    updateDemo(demoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = yield DemoSchema_1.DemosMongoDatabase.connect().then(() => DemoSchema_1.DemosMongoDatabase.model.findOne(demoData.mongoId));
            dto.demo = demoData.demo;
            const saved = yield dto.save((err, a) => {
                return a;
            });
            return saved;
        });
    }
    deleteDemo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DemoSchema_1.DemosMongoDatabase.connect().then(() => {
                return DemoSchema_1.DemosMongoDatabase.model.remove({ _id: id });
            });
        });
    }
};
DemoRepositoryMongo = __decorate([
    inversify_1.injectable()
], DemoRepositoryMongo);
exports.DemoRepositoryMongo = DemoRepositoryMongo;
let DemoRepositoryDb = class DemoRepositoryDb extends BaseRepository_1.BaseRepository {
    constructor() {
        super();
    }
    _setRepository(connection) {
        this.demoRepository = connection.getRepository(DemoSchema_1.DemoDbSchema);
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let records;
            yield this.demoRepository.find()
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
    createDemo(demoData) {
        return __awaiter(this, void 0, void 0, function* () {
            let demoInstance = new DemoSchema_1.DemoDbSchema();
            demoInstance.demo = demoData.demo;
            demoInstance.mongoId = demoData.mongoId;
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let records;
            yield this.demoRepository.save(demoInstance)
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
    updateDemo(demoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let demoRecord = yield this.demoRepository.findOne({ mongoId: demoData.mongoId });
            demoRecord.demo = demoData.demo;
            let records;
            yield this.demoRepository.persist(demoRecord).then((data) => {
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
    deleteDemo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield this.makeConnection(CONNECTION_NAME);
            this._setRepository(conn);
            let deleteDemo = yield this.demoRepository.findOne({ mongoId: id });
            yield this.demoRepository.remove(deleteDemo).then((data) => {
                if (data) {
                    this.disconnect(conn);
                }
                else {
                    this.disconnect(conn);
                }
            }).catch(err => {
                this.disconnect(conn);
            });
            return parseInt(deleteDemo._id);
        });
    }
};
DemoRepositoryDb = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], DemoRepositoryDb);
exports.DemoRepositoryDb = DemoRepositoryDb;
//# sourceMappingURL=DemoRepository.js.map