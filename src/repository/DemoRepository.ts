import { injectable } from 'inversify'
import { Repository, Connection } from 'typeorm';
import { BaseRepository } from './BaseRepository'
import { DemoDTO, DemosMongoDatabase, DemoDbSchema, DemoMongoSchema } from '../schema/DemoSchema';

const CONNECTION_NAME = 'demo'
/**
 * Interface for iridium and typeorm database operations on Demo API
 * 
 * @export
 * @interface DemoRepository
 */

export interface DemoRepository {
    findAll(): Promise<Array<DemoDTO>>
    createDemo(demoData: DemoDTO): Promise<DemoDTO>
    updateDemo(demoData: DemoDTO): Promise<DemoDTO>
    deleteDemo(id: string | number): Promise<number>
}


/**
* Iridium implementation on Demo API
* 
* @export
* @class DemoRepositoryMongo
* @implements {DemoRepository}
*/

@injectable()
export class DemoRepositoryMongo implements DemoRepository {

    /**
     * Find all the mongodb objects inside demo
     * 
     * @returns {Promise<Array<DemoDTO>>} 
     * @memberof DemoRepositoryMongo
     */

    public async findAll(): Promise<Array<DemoDTO>> {
        const DemoDTOs = await DemosMongoDatabase.connect().then(() => DemosMongoDatabase.model.find())
        return DemoDTOs.toArray()
    }

    /**
    * Create new mongo document for Demo
    * 
    * @param {DemoDTO} demoData 
    * @returns {Promise<DemoDTO>} 
    * @memberof DemoRepositoryMongo
    */
    public async createDemo(demoData: DemoDTO): Promise<DemoDTO> {
        return await DemosMongoDatabase.connect().then(() => {

            return DemosMongoDatabase.model.insert(demoData)
        })

    }
    /**
   * update demo in mongoDb
   * 
  
   * @param {DemoDTO} demoData 
   * @returns {Promise<DemoDTO>} 
   * @memberof DemoRepositoryMongo
   */
    public async updateDemo(demoData: DemoDTO): Promise<DemoDTO> {
        const dto: DemoMongoSchema = await DemosMongoDatabase.connect().then(() => DemosMongoDatabase.model.findOne(demoData.mongoId));
        dto.demo = demoData.demo;

        const saved = await dto.save((err: Error, a: DemoDTO) => {
            return a;
        })

        return saved;

    }


    /**
      * Delete a Demo document using the id
      * 
      * @param {number} id 
      * @returns {Promise<number>} 
      * @memberof DemoRepositoryMongo
      */
    public async  deleteDemo(id: string | number): Promise<number> {
        return await DemosMongoDatabase.connect().then(() => {
            return DemosMongoDatabase.model.remove({ _id: id })
        })
    }



}
/**
 * Typeorm implementation on Demo
 * 
 * @export
 * @class DemoRepositoryDb
 * @extends {BaseRepository}
 * @implements {DemoRepository}
 */
@injectable()
export class DemoRepositoryDb extends BaseRepository implements DemoRepository {

    /**
     * Repository object for performing Db operations
     * 
     * @private
     * @type {Repository<DemoDbSchema>}
     * @memberof DemoRepositoryDb
     */
    private demoRepository: Repository<DemoDbSchema>

    /**
     * Creates an instance of DemoRepositoryDb.
     * @memberof DemoRepositoryDb
     */
    constructor() {
        super()
    }

    /**
     * Sets the correct repository object on DemoRepository private member
     * 
     * @private
     * @param {Connection} connection 
     * @memberof DemoRepositoryDb
     */
    private _setRepository(connection: Connection) {
        this.demoRepository = connection.getRepository(DemoDbSchema)
    }

    /**
     * Finds all the rows in Demo table
     * 
     * @returns {Promise<Array<DemoDTO>>} 
     * @memberof DemoRepositoryDb
     */
    public async findAll(): Promise<Array<DemoDTO>> {
        const conn = await this.makeConnection(CONNECTION_NAME)
        this._setRepository(conn)
        let records
        await this.demoRepository.find()
            .then((data) => {
                if (data) {
                    records = data;
                    this.disconnect(conn)
                }
                else {
                    this.disconnect(conn)
                }
            }).catch(err => {
                this.disconnect(conn)
            })

        return records

    }

    /**
    * Creates a new row in Demo table
    * 
    * @param {any} DemoData 
    * @param {any} DemoData 
    * @returns {Promise<DemoDTO>} 
    * @memberof DemoRepositoryDb
    */
    public async createDemo(demoData: DemoDTO): Promise<DemoDTO> {

        let demoInstance = new DemoDbSchema();
        demoInstance.demo = demoData.demo;
        demoInstance.mongoId = demoData.mongoId;


        const conn = await this.makeConnection(CONNECTION_NAME)
        this._setRepository(conn)
        let records
        await this.demoRepository.save(demoInstance)
            .then((data) => {
                if (data) {
                    records = data;
                    this.disconnect(conn)
                }
                else {
                    this.disconnect(conn)
                }
            }).catch(err => {
                this.disconnect(conn)
            })

        return records
    }

    /**
     * Update an demo in db table
     * 
     * @param {any} demoData 
     * @returns {Promise<DemoDTO>} 
     * @memberof DemosRepositoryDb
     */
    public async updateDemo(demoData: DemoDTO): Promise<DemoDTO> {
        const conn = await this.makeConnection(CONNECTION_NAME)
        this._setRepository(conn)
        let demoRecord = await this.demoRepository.findOne({ mongoId: demoData.mongoId });
        demoRecord.demo = demoData.demo;
        let records
        await this.demoRepository.persist(demoRecord).then((data) => {
            if (data) {
                records = data;
                this.disconnect(conn)
            }
            else {
                this.disconnect(conn)
            }
        }).catch(err => {
            this.disconnect(conn)
        })

        return records
    }

    /**
     * Deletes a row in Demo table
     * 
     * @param {any} id 
     * @returns {Promise<number>} 
     * @memberof DemoRepositoryDb
     */
    public async deleteDemo(id): Promise<number> {
        const conn = await this.makeConnection(CONNECTION_NAME)
        this._setRepository(conn)
        let deleteDemo = await this.demoRepository.findOne({ mongoId: id });
        await this.demoRepository.remove(deleteDemo).then((data) => {
            if (data) {
                this.disconnect(conn)
            }
            else {
                this.disconnect(conn)
            }
        }).catch(err => {
            this.disconnect(conn)
        })

        return parseInt(deleteDemo._id)
    }

}