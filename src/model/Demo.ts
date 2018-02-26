/**
 * Demo model
 * 
 * @export
 * @class Demo
 */
export class Demo {
    
        /**
         * Creates an instance of Demo.
        
         * @param {string} [_id] 
         * @param {string} demo
         * @param {string} mongoId
         * @memberof Demo
         */
        constructor(
            private demo: string,
            private mongoId?: string,
            private _id?: string
        ) {
        }
    
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberof Demo
         */
        get getDemo(): string {
            return this.demo;
        }
    
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberof Demo
         */
        get getMongoId(): string {
            return this.mongoId;
        }
    
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberof Demo
         */
        get getId(): string {
            return this._id;
        }
    
    
    }