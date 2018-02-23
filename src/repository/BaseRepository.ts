import { createConnection, Connection, ConnectionOptions, getConnectionManager } from 'typeorm';
import { injectable } from 'inversify'
import CONFIG from '../config'
import { DemoDbSchema } from '../schema/DemoSchema'


/**
 * 
 * 
 * @export
 * @abstract
 * @class BaseRepository
 */
@injectable()
export abstract class BaseRepository {

    /**
     * Creates an instance of BaseRepository.
     * @memberof BaseRepository
     */
    constructor() {

    }

    /**
     * Creates and manages postgres Db connections using Typeorm
     * 
     * @private
     * @returns {Promise<Connection>} 
     * @memberof BaseRepository
     */
    private _connect(name: string): Promise<Connection> {
        const PostgresConnection = getConnectionManager().has(CONFIG.typeorm.name)
        if (!PostgresConnection) {
            return createConnection(<ConnectionOptions>{
                name: name || CONFIG.typeorm().name,
                type: 'postgres',
                host: CONFIG.typeorm().host,
                port: CONFIG.typeorm().port,
                username: CONFIG.typeorm().username,
                password: CONFIG.typeorm().password,
                database: CONFIG.typeorm().database,
                entities: [DemoDbSchema],
                autoSchemaSync: CONFIG.typeorm().autoSchemaSync
            })
        } else if (getConnectionManager().get(CONFIG.typeorm.name).isConnected) {
            return Promise.resolve(getConnectionManager().get(CONFIG.typeorm.name))
        } else {
            return getConnectionManager().get(CONFIG.typeorm.name).connect()
        }

    }

    /**
     * Public method to create a new connection
     * 
     * @returns {Promise<Connection>} 
     * @memberof BaseRepository
     */
    public makeConnection(conn_name: string = null): Promise<Connection> {
        return this._connect(conn_name)
            .then(async connection => {
                return connection
            })
    }

    /**
     * Public method to disconnect from Db
     * 
     * @param {Connection} conn 
     * @memberof BaseRepository
     */
    public disconnect(conn: Connection) {
        conn.close()
    }
}