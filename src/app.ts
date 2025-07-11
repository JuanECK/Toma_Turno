import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';
import { MySqlConnect } from './data/mySQL/conexión';
import mysql from 'mysql2/promise'
import { Sequelize } from 'sequelize';


(async()=> {
  main();
})();


function main() {

    //----Conexion a base de datos MySql 



// const sequelize: Sequelize = new Sequelize('railway', 'root', 'uREuZwWuBhUrnAVYMsGSyMOHGfZCwnkK', {
//   host: 'shinkansen.proxy.rlwy.net',
//   port: 15549,
//   dialect: 'mysql',
//   dialectOptions: {
//     connectTimeout: 10000
//   }
// });

// sequelize.authenticate()
//   .then((): void => {
//     console.log('Conexión exitosa 🚀');
//   })
//   .catch((err: unknown): void => {
//     console.error('Error de conexión ❌', err);
//   });


  MySqlConnect.connect({
    host: envs.MSQL_HOST,
    user: envs.MSQL_USER,
    password: envs.MSQL_PASSWORD,
    database: envs.MSQL_DATABASE,
    port: +envs.MSQL_PORT,
  })


  const server = new Server({
    port: envs.PORT,
    // routes: AppRoutes.routes,
  });

  const httpServer = createServer( server.app );
  WssService.initWss({ server:httpServer })

  server.setRoutes( AppRoutes.routes );


  httpServer.listen(envs.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto: ${envs.PORT}`   )
  })
  // server.start();
}