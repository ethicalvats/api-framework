import { injectable, inject } from 'inversify'

import { Demo } from '../model/Demo';


import { DemoRepository } from "../repository/DemoRepository"

import TYPES from '../types/types'

import { DemoDTO } from '../schema/DemoSchema'


/**
 * Interface for services on Demo API
 * 
 * @export
 * @interface DemoService
 */
export interface DemoService {
    getDemo(): Promise<object>
    createDemo(demoData: Demo): Promise<Demo | Error>
    updateDemo(demoData: Demo): Promise<Demo | Error>
    deleteDemo(id: string | number): Promise<number>
}

/**
 * DemoService interface implementation
 * 
 * @export
 * @class DemoServiceImpl
 * @implements {DemoService}
 */
@injectable()
export class DemoServiceImpl implements DemoService {

    /**
     * Using inversify bindings sets the mongo repository implementation
     * 
     * @private
     * @type {DemoRepository}
     * @memberof DemoServiceImpl
     */
    @inject(TYPES.DemoNoSQLRepository)
    private DemoRepositoryMongo: DemoRepository

    /**
     * Using inversify bindings sets the postgres repository implementation
     * 
     * 
     * 
     * @private
     * @type {DemoRepository}
     * @memberof DemoServiceImpl
     */
    @inject(TYPES.DemoSQLRepository)
    private DemoRepositoryDb: DemoRepository

    /**
     * Gets all the demos
     * 
     * @returns {Promise<Array<Demo>>} 
     * @memberof DemoServiceImpl
     */
    public async getDemo(): Promise<Array<Demo>> {
        const demosMongo: Array<Demo> = await this.DemoRepositoryMongo.findAll().then((a) => a.map((dto: DemoDTO) => {
            return this.toDemo(dto);
        }));


        const demosDb: Array<Demo> = await this.DemoRepositoryDb.findAll().then((a2) => a2.map((dto: DemoDTO) => {
            return this.toDemo(dto);
        }));

        return demosDb;

    }

    /**
     * Creates a new Demo 
     * 
     * @param {Demo} demoData 
     * @returns {(Promise<Demo|Error>)} 
     * @memberof DemoServiceImpl
     */
    public async  createDemo(demoData: Demo): Promise<Demo | Error> {

        const demoDTO: DemoDTO = this.toDemoDTO(demoData);

        const createdDTO: DemoDTO = await this.DemoRepositoryMongo.createDemo(demoDTO);

        demoDTO.mongoId = createdDTO._id;
        const demoDb = this.DemoRepositoryDb.createDemo(demoDTO)
            .then((data) => {
                return this.toDemo(data)
            }).catch(err => {
                this.DemoRepositoryDb.deleteDemo(createdDTO._id)
                this.DemoRepositoryMongo.deleteDemo(createdDTO._id)
                throw new Error(err)
            })

        return demoDb
    }

    /**
    * update an Demo
    * 
    * @param {Demo} demoData 
    * @returns {(Promise<Demo|Error>)} 
    * @memberof DemoServiceImpl
    */
    public async updateDemo(demoData: Demo): Promise<Demo | Error> {
        const demoDTO: DemoDTO = this.toDemoDTO(demoData);
        const updatedDTO: DemoDTO = await this.DemoRepositoryMongo.updateDemo(demoDTO);
        const updatedDb = await this.DemoRepositoryDb.updateDemo(demoDTO)
            .then((data) => {
                return this.toDemo(data)
            }).catch(err => {
                throw new Error(err)
            })

        return updatedDb

    }

    /**
 * delete a place record
 *
 * @param {Place} placeData 
 * @returns {(Promise<number>)} 
 * @memberof PlaceServiceImpl
 */
    public async deleteDemo(demoId): Promise<number> {
        await this.DemoRepositoryMongo.deleteDemo(demoId)
        return await this.DemoRepositoryDb.deleteDemo(demoId)
    }




    /**
     * Converts demo DTO to model
     * 
     * @private
     * @param {DemoDTO} demoDTO 
     * @returns {Demo} 
     * @memberof DemoServiceImpl
     */
    private toDemo(demoDTO: DemoDTO): Demo {
        return new Demo(
            demoDTO.demo,
            demoDTO.mongoId,
            demoDTO._id.toString()
        )
    }


    /**
     * Converts demo model to DTO
     * 
     * @private
     * @param {Demo} demo 
     * @returns {DemoDTO} 
     * @memberof DemoServiceImpl
     */
    private toDemoDTO(demo: Demo): DemoDTO {
        return {

            demo: demo.getDemo,
            mongoId: demo.getMongoId,
            _id: demo.getId,

        }
    }
}