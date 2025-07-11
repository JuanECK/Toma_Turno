import express, { Router } from 'express';
import path from 'path';

import cors from 'cors';


interface Options {
  port: number;
  // routes: Router;
  public_path?: string;
}
const  allowedOrigins = ['http://localhost:4200','http://localhost:4300'] // origen de la aplicacion

  //---- Configuracion del uso de cors
// const corsOptions = {
//   origin: function ( origin:any, callback:any ) {
//     if (!origin) {
//          // Permite solicitudes sin un origen (como las solicitudes desde la misma máquina)
//          return callback(null, true);
//        }
//        if (allowedOrigins.indexOf(origin) === -1) {
//          const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//          return callback(new Error(msg), false);
//        }
//        return callback(null, true);
//   },
//   credentials: true,  // credenciales en la cabecera
//   optionsSuccessStatus: 200 // status de la respuesta
// }

  //---- Configuracion del uso de cors
const corsOptions = {
  origin: ['http://localhost:4200','http://localhost:4300'], // origen de la aplicacion
  credentials: true,  // credenciales en la cabecera
  optionsSuccessStatus: 200 // status de la respuesta
}

export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  // private readonly publicPath: string;
  // private readonly routes: Router;

  constructor(options: Options) {
    const { port, } = options;
    // const { port, public_path = 'public' } = options;
    // const { port, routes, public_path = 'public' } = options;
    this.port = port;
    // this.publicPath = public_path;
    // this.routes = routes;
    this.configure();
  }


  private configure() {

    //* Middlewares
    this.app.use(cors(corsOptions)); // para que se pueda acceder a la api desde el origen pactado con sus credenciales y opciones
    this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Public Folder
    // this.app.use(express.static(this.publicPath));

    //CORS
    // this.app.use(cors(corsOptions));

    //* Routes
    // this.app.use( this.routes );

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    // this.app.get(/^\/(?!api).*/, (req, res) => {
    //   const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
    //   res.sendFile(indexPath);
    // });

  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  async start() {

    // para que se pueda acceder a la api desde el origen pactado con sus credenciales y opciones

    this.app.disable('x-powered-by')
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
