import DSNParser = require('dsn-parser')
interface PGConfigOptions {
    name: string,
    host: string,
    port: number,
    username: string,
    password: string,
    database: any,
    autoSchemaSync: boolean
}

const Config = {
    typeorm: function () {
        var opts: PGConfigOptions;
        if (process.env.DATABASE_URL) {
            let dsn = new DSNParser(process.env.DATABASE_URL)
            // let pg_conf = dsn.getParts()
            opts = {
                name: 'postgres',
                host: dsn.get('host'),
                port: dsn.get('port'),
                username: dsn.get('user'),
                password: dsn.get('password'),
                database: dsn.get('database'),
                autoSchemaSync: true
            }

        } else {
            opts = {
                name: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '',
                database: 'BizFrameworkDb',
                autoSchemaSync:true
        }
    }
        return opts
},
    mongo: function(){
        if(process.env.MONGO_URL) {
            let dsn = new DSNParser(process.env.MONGO_URL)
            // let mongo_conf = dsn.getParts()
            console.log('Mongo connection ..', dsn.getParts())
            return {
                host: dsn.get('host'),
                port: dsn.get('port'),
                username: dsn.get('user'),
                password: dsn.get('password'),
                database: dsn.get('database'),
            }
        }else{
            return {database: 'BizFrameworkDb' }
        }
    }
}

export default Config