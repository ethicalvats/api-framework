"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const errorHandler = require("errorhandler");
const methodOverride = require("method-override");
const colors = require("colors");
const inversify_config_1 = require("./inversify.config");
const cors = require("cors");
const inversify_express_utils_1 = require("inversify-express-utils");
const busboyBodyParser = require("busboy-body-parser");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        console.log(colors.gray.bgGreen('API is listening..                                                                      '));
        this.config();
        let server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: '/api/v1' }, this.app);
        server.build();
    }
    config() {
        this.app.use(cors());
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");
        this.app.use(logger("dev"));
        this.app.use(bodyParser.json({
            limit: '50mb',
        }));
        this.app.use(bodyParser.urlencoded({
            limit: '50mb',
            extended: true
        }));
        this.app.use(busboyBodyParser({
            multi: true,
            limit: '50mb',
            extended: true
        }));
        this.app.use(cookieParser("SECRET_GOES_HERE"));
        this.app.use(methodOverride());
        this.app.use(function (err, req, res, next) {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
    }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map