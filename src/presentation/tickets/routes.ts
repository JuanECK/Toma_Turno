import { Router } from "express";
import { TicketConrtoller } from "./controller";


export class TicketRoutes {

//Definicion de rutas para los tickets

static get routes() {

    const routes = Router();
    const ticketConrtoller = new TicketConrtoller();

    routes.get('/', ticketConrtoller.getTickets);
    routes.get('/last', ticketConrtoller.getLastTicketsNumbers);
    routes.get('/pending', ticketConrtoller.pendingTickets);
    
    routes.post('/', ticketConrtoller.createTicket);

    routes.get('/draw/:desk', ticketConrtoller.drawTicket);
    routes.put('/done/:ticketId', ticketConrtoller.finishedTicket);
    
    routes.get('/working-on', ticketConrtoller.workingOn);

    return routes;
}

}