"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ActivityType {
    constructor(activityType, mongoId, _id) {
        this.activityType = activityType;
        this.mongoId = mongoId;
        this._id = _id;
    }
    get getActivityType() {
        return this.activityType;
    }
    get getMongoId() {
        return this.mongoId;
    }
    get getId() {
        return this._id;
    }
}
exports.ActivityType = ActivityType;
//# sourceMappingURL=ActivityType.js.map