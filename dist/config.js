"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DSNParser = require("dsn-parser");
const Config = {
    typeorm: function () {
        var opts;
        if (process.env.DATABASE_URL) {
            let dsn = new DSNParser(process.env.DATABASE_URL);
            opts = {
                name: 'postgres',
                host: dsn.get('host'),
                port: dsn.get('port'),
                username: dsn.get('user'),
                password: dsn.get('password'),
                database: dsn.get('database'),
                autoSchemaSync: true
            };
        }
        else {
            opts = {
                name: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '',
                database: 'BizFrameworkDb',
                autoSchemaSync: true
            };
        }
        return opts;
    },
    mongo: function () {
        if (process.env.MONGO_URL) {
            let dsn = new DSNParser(process.env.MONGO_URL);
            console.log('Mongo connection ..', dsn.getParts());
            return {
                host: dsn.get('host'),
                port: dsn.get('port'),
                username: dsn.get('user'),
                password: dsn.get('password'),
                database: dsn.get('database'),
            };
        }
        else {
            return { database: 'BizFrameworkDb' };
        }
    }
};
exports.default = Config;
//# sourceMappingURL=config.js.map