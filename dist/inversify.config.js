"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
const DemoController_1 = require("./controller/DemoController");
const DemoService_1 = require("./service/DemoService");
const DemoRepository_1 = require("./repository/DemoRepository");
const container = new inversify_1.Container();
container.bind(inversify_express_utils_1.TYPE.Controller).to(DemoController_1.DemoController).whenTargetNamed('DemoController');
container.bind(types_1.default.DemoService).to(DemoService_1.DemoServiceImpl);
container.bind(types_1.default.DemoNoSQLRepository).to(DemoRepository_1.DemoRepositoryMongo);
container.bind(types_1.default.DemoSQLRepository).to(DemoRepository_1.DemoRepositoryDb);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map