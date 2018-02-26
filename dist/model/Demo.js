"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Demo {
    constructor(demo, mongoId, _id) {
        this.demo = demo;
        this.mongoId = mongoId;
        this._id = _id;
    }
    get getDemo() {
        return this.demo;
    }
    get getMongoId() {
        return this.mongoId;
    }
    get getId() {
        return this._id;
    }
}
exports.Demo = Demo;
//# sourceMappingURL=Demo.js.map