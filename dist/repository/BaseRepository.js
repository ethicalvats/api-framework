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
const typeorm_1 = require("typeorm");
const inversify_1 = require("inversify");
const config_1 = require("../config");
const DemoSchema_1 = require("../schema/DemoSchema");
let BaseRepository = class BaseRepository {
    constructor() {
    }
    _connect(name) {
        const PostgresConnection = typeorm_1.getConnectionManager().has(config_1.default.typeorm.name);
        if (!PostgresConnection) {
            return typeorm_1.createConnection({
                name: name || config_1.default.typeorm().name,
                type: 'postgres',
                host: config_1.default.typeorm().host,
                port: config_1.default.typeorm().port,
                username: config_1.default.typeorm().username,
                password: config_1.default.typeorm().password,
                database: config_1.default.typeorm().database,
                entities: [DemoSchema_1.DemoDbSchema],
                autoSchemaSync: config_1.default.typeorm().autoSchemaSync
            });
        }
        else if (typeorm_1.getConnectionManager().get(config_1.default.typeorm.name).isConnected) {
            return Promise.resolve(typeorm_1.getConnectionManager().get(config_1.default.typeorm.name));
        }
        else {
            return typeorm_1.getConnectionManager().get(config_1.default.typeorm.name).connect();
        }
    }
    makeConnection(conn_name = null) {
        return this._connect(conn_name)
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            return connection;
        }));
    }
    disconnect(conn) {
        conn.close();
    }
};
BaseRepository = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], BaseRepository);
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map