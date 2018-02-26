import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import CONFIG from '../config'


export interface DemoDTO {
    _id?: string;
    mongoId?: string;
    demo: string;
}

/**
* Iridium config
*/

@Collection('Demo')
export class DemoMongoSchema extends Instance<DemoDTO, DemoMongoSchema> implements DemoDTO {
    @ObjectID
    public _id: string;

    @Property(String, true)
    public demo: string;

}

class DemoDatabase extends Core {
    public model = new Model<DemoDTO, DemoMongoSchema>(this, DemoMongoSchema);

}

export const DemosMongoDatabase = new DemoDatabase(CONFIG.mongo());



/**
 * TypeORM Schema Config
 */
@Entity()
export class DemoDbSchema implements DemoDTO {
    @PrimaryGeneratedColumn()
    // tslint:disable-next-line:variable-name
    public _id: string;

    @Column()
    public mongoId: string;

    @Column()
    public demo: string;
}

