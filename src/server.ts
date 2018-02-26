import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import colors = require('colors')
import TYPES from './types/types';
import container from './inversify.config';
import cors = require('cors')
import { InversifyExpressServer } from 'inversify-express-utils';
import busboyBodyParser = require('busboy-body-parser');

// 
/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();

    console.log(colors.gray.bgGreen('API is listening..                                                                      '))

    //configure application
    this.config();

    // grabs the Controller from IoC container and registers all the endpoints
    let server = new InversifyExpressServer(container, null, { rootPath: '/api/v1' }, this.app)
    server.build()
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {
    // enable CORS for all the origins
    this.app.use(cors())
    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //configure pug
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "pug");

    //use logger middlware
    this.app.use(logger("dev"));

    // use json form parser middlware
    this.app.use(bodyParser.json({
      limit: '50mb',
    }));

    //use query string parser middlware
    this.app.use(bodyParser.urlencoded({
      limit: '50mb',
      extended: true
    }));

    //It will add regular fields to req.body as per body-parser but will also add uploaded files to req.files.
    this.app.use(busboyBodyParser({
      multi: true,
      limit: '50mb',
      extended: true
    }));



    //use cookie parser middleware
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //use override middlware
    this.app.use(methodOverride());

    //catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    //error handling
    this.app.use(errorHandler());
  }

}