
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import { envs } from '../../config/envs';


interface OptionsMsql {
    host: string,
    user: string,
    password: string,
    database: string,
    port:Number,
}

export class MySqlConnect {


    static async connect(options: OptionsMsql) {
        const { host, user, password, database, port } = options;

        const sequelize = new Sequelize(database, user, password, {
            host: host,
            port: +port,
            dialect: 'mysql',
            dialectOptions: {
                connectTimeout: 10000
            }
        })

        try {
            await sequelize.authenticate();

            console.log('Conexión exitosa 🚀')
            return true

        } catch (error: unknown) {
            console.log('Error de conexión ❌', error);
            throw error;
        }

    }

}
