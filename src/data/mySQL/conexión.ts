
import mysql from 'mysql2';
import { Sequelize } from 'sequelize';
import { envs } from '../../config/envs';


interface OptionsMsql {
    host: string,
    user: string,
    password: string,
    database: string,
}

export class MySqlConnect {


    static async connectToDatabase(connectionUrl: string) {
        try {
            const connection = await mysql.createConnection(connectionUrl);
            console.log('Connected to MySQL database!');
            return connection;
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error;
        }
    }

    // static async connect( options:OptionsMsql ) {
    //     const { host, user, password, database } =  options;

    //     const sequelize = new Sequelize(
    //         // 'mysql://root:WZJbrlJoyymmHZwTMBBzMLZjPySSvFip@mysql.railway.internal:3306/Tornillo'
    //         database, 
    //         user, 
    //         password,
    //         {
    //         host,
    //         dialect:'mysql',
    //         // logging:false
    //         }
    //      )

    //         try {
    //             await sequelize.authenticate();

    //             console.log('conectado DB')
    //             return true

    //         } catch (error) {
    //             console.log('Error con la coneccion de MySql');
    //             throw error;
    //         }

    //     }

}
