
import { Sequelize } from 'sequelize';
// import { envs } from '../../../config';
import  { createConnection, createPool }  from 'mysql2/promise';
import { envs } from '../../config/envs';


    export const db  = new Sequelize(
      envs.MSQL_DATABASE, envs.MSQL_USER, envs.MSQL_PASSWORD, {
            host: envs.MSQL_HOST,
            port: +envs.MSQL_PORT,
            dialect: 'mysql',
            dialectOptions: {
                connectTimeout: 10000
            }
        })


        
        
        