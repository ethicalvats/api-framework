import { BaseController } from './BaseController'
import { injectable, inject } from 'inversify';
import * as express from 'express'
import colors = require('colors')
import { interfaces, controller, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { DemoService } from '../service/DemoService';

import { DemoDTO, DemosMongoDatabase, } from '../schema/DemoSchema';
import { Demo } from '../model/Demo';

import TYPES from '../types/types'

/**
 * Controller class for Demo API
 * 
 * @export
 * @class DemoController
 * @extends {BaseController}
 * @implements {interfaces.Controller}
 */


@controller('/demo')
@injectable()
export class DemoController extends BaseController implements interfaces.Controller {

    private demoService: DemoService

    /**
     * Creates an instance of SchemaTestController.
     * @constructor SchemaTestController
     */
    constructor( @inject(TYPES.DemoService) demoService: DemoService) {
        super()
        this.demoService = demoService

    }

    /**
     * Index of all the Demo created must also support pagination
     * 
     * @private
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns {Promise<express.Response>} 
     * @memberof DemoController
     */
    @httpGet('/')
    private async getDemo(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
        const demo = await this.demoService.getDemo().catch(err => console.log(err))
        return this.renderJSON(req, res, { demo: demo })
    }

    /**
     * Create a new Demo with passed req body params defined as in the json schema
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     * @memberof DemoController
     */
    @httpPost('/')
    public async createDemo(req: express.Request, res: express.Response, next: express.NextFunction) {
        const demoData: DemoDTO = req.body.demo
        let demos = new Demo(
            demoData.demo,

        )

        let createdDemo
        try {
            createdDemo = await this.demoService.createDemo(demos)
        } catch (error) {
            return this.renderError(req, res, error)
        }
        this.renderJSON(req, res, { demo: createdDemo }, 201)
    }

    /**
    * update a new demo with passed req body params defined as in the json schema
    * 
    * @param {express.Request} req 
    * @param {express.Response} res 
    * @param {express.NextFunction} next 
    * @returns 
    * @memberof DemoController
    */
    @httpPut('/:id')
    public async updateDemo(req: express.Request, res: express.Response, next: express.NextFunction) {

        const demoData = req.body.demo
        let id = req.params.id;
        let demo = new Demo(
            demoData.demo,
            id)
        const updatedDemo = await this.demoService.updateDemo(demo).catch(err => next(err));
        this.renderJSON(req, res, { Demo: updatedDemo }, 200)
    };

    /**
        * Delete a demo record from database
        * 
        * @private
        * @param {express.Request} req 
        * @param {express.Response} res 
        * @param {express.NextFunction} next 
        * @returns {Promise<express.Response>} 
        * @memberof DemoController
        */
    @httpDelete('/:demoId')
    private async demoDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
        var demoid = req.params.demoId;
        const deletedDemo = await this.demoService.deleteDemo(demoid).catch(err => console.log(err))
        return this.renderJSON(req, res, { places: deletedDemo }, 204)
    }

}