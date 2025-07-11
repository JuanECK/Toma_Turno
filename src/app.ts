import { createServer } from 'http';
import { envs } from './config/envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';
import { WssService } from './presentation/services/wss.service';
import { MySqlConnect } from './data/mySQL/conexión';
import mysql from 'mysql2/promise'


(async()=> {
  main();
})();


function main() {

    //----Conexion a base de datos MySql 
    const myConnectionUrl ='mysql://root:WZJbrlJoyymmHZwTMBBzMLZjPySSvFip@mysql.railway.internal:3306/Tornillo'
  MySqlConnect.connectToDatabase(myConnectionUrl)
  .then(connection => {
    console.log(connection)
 
  })
  .catch(err => {
    console.error('Failed to connect:', err);
  });



  // MySqlConnect.connect({
  //   host: envs.MSQL_HOST,
  //   user: envs.MSQL_USER,
  //   password: envs.MSQL_PASSWORD,
  //   database: envs.MSQL_DATABASE,
  // })

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