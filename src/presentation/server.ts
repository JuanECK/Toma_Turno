import express, { Router } from 'express';
import path from 'path';
import cors from 'cors';

interface Options {
  port: number;
  // routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  // private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    // const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    // this.routes = routes;
    this.configure();
  }


  private configure() {

  //---- Configuracion del uso de cors
    const corsOptions = {
      origin: 'http://localhost:4200', // origen de la aplicacion
      credentials:true,  // credenciales en la cabecera
      optionsSuccessStatus: 200 // status de la respuesta
    }

    //* Middlewares
    this.app.use( express.json() ); // raw
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

    //* Public Folder
    this.app.use( express.static( this.publicPath ) );

    //CORS
    this.app.use(cors(corsOptions));

    //* Routes
    // this.app.use( this.routes );

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get(/^\/(?!api).*/, (req, res) => {
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
      res.sendFile(indexPath);
    });

  }
  
  public setRoutes( router:Router ){
    this.app.use( router ); 
  }
  
  async start() {
    
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
