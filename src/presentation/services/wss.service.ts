
import { Server } from 'http';
import { WebSocketServer, WebSocket } from 'ws'

interface Options{
    server:Server;
    path?:string; // ws
}

export class WssService {
    
    private static _instance: WssService;
    private wss:WebSocketServer;

    private constructor(options:Options){
        const { server, path='/ws' } = options // localhost:3000/ws

        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static get instance(): WssService {
        if( !WssService._instance ){
            throw 'WssService no esta inisializada';
        }
        return WssService._instance;
    }

    static initWss( options: Options ){
        WssService._instance = new WssService(options)
    }

    public sendMessqage( type:string, payload:Object ){
        this.wss.clients.forEach( client => {
            if( client.readyState === WebSocket.OPEN ){
                client.send( JSON.stringify({type, payload}) )
            }
        } )
    }

    public start(){
        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Cliente conectado');
            ws.on('close',() =>console.log('Cliente desconectado'))
        })
    }

}