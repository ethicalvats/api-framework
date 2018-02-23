import { NextFunction, Request, Response, Router } from "express";
import { injectable } from 'inversify';

/**
 * Create a base controller class
 * @class BaseController
 */
@injectable()
export abstract class BaseController {

  constructor() {
  }

  /**
   * Render a json.
   *
   * @class BaseController
   * @method renderJSON
   * @param req {Request} The request object.
   * @param res {Response} The response object.
   * @param options {Object} Additional options to be sent with response.
   * @return void
   */
  public renderJSON(req: Request, res: Response, options: Object, status:number = 200) {
    res.status(status)
    return res.json(options)
  }

  /**
   * Send error json reponse for a thrown exception
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {*} errors 
   * @returns 
   * @memberof BaseController
   */
  public renderError(req:Request, res:Response, errors:any){
    res.status(500)
    return res.json({error:errors.message})
  }

}
