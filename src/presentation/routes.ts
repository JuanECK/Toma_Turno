import { Router } from 'express';
import { TicketRoutes } from './tickets/routes';
import { AutenticacionRutas } from './auth/rutas';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Rutas Definidas

    router.use('/auth', AutenticacionRutas.routes )

    router.use('/api/ticket', TicketRoutes.routes)

    return router;
  }


}

