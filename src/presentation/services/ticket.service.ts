import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from "../../domain/interfaces/ticket";
import { WssService } from "./wss.service";

export class TicketService{

    constructor(
        private readonly wssService = WssService.instance,
    ){}

    public tickets:Ticket [] = [
        {id:UuidAdapter.v4(), number: 1, createAt: new Date(), done:false, handleDoneAt: new Date()},
        {id:UuidAdapter.v4(), number: 2, createAt: new Date(), done:false, handleDoneAt: new Date()},
        {id:UuidAdapter.v4(), number: 3, createAt: new Date(), done:false, handleDoneAt: new Date()},
        {id:UuidAdapter.v4(), number: 4, createAt: new Date(), done:false, handleDoneAt: new Date()},
        {id:UuidAdapter.v4(), number: 5, createAt: new Date(), done:false, handleDoneAt: new Date()},
    ];

    private readonly workingOnTickets: Ticket[] = []

    public get pendingTickets():Ticket[]{
        return this.tickets.filter( ticket => !ticket.handleAtDesk && ticket.done == false )
    }

    public get lastWorkingOnTickets():Ticket[]{
        return  this.workingOnTickets.slice(0,4);
    }

    public get lastTicketNumber():number{
        return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0
    }

    public createTicket(){
        const ticket: Ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber + 1,
            createAt: new Date(),
            done: false,
            handleDoneAt: new Date(),
            handleAtDesk: undefined,
            handleAt: undefined,
        }

        this.tickets.push(ticket)

        this.onTicketNumberChanged();

        return ticket;
    }

    public drawTicket(desk:string){
        const Ticket = this.tickets.find( t => !t.handleAtDesk )
        if( !Ticket ) return { status:'error', message:'No hay tickets pendientes' };

        Ticket.handleAtDesk = desk;
        Ticket.handleAt = new Date();

        this.workingOnTickets.unshift({...Ticket});

        this.onTicketNumberChanged()
        this.onWorckingOnChanged();

        return { status:'ok', Ticket }

    }

    public onFinishedTicket ( id:string ){
        const Ticket = this.tickets.find( t => t.id === id );
        if( !Ticket ) return { status:'error', message:'Ticket no encontrado' }

        this.tickets = this.tickets.map(ticket => {

            if(ticket.id === id){
                ticket.done = true,
                ticket.handleDoneAt = new Date();
            }

            return ticket
        })

        return {status: 'ok'}
    }

    private onTicketNumberChanged(){
        this.wssService.sendMessqage('on-ticket-count-changed', this.pendingTickets.length );
    }
    private onWorckingOnChanged(){
        this.wssService.sendMessqage('on-working-changed', this.lastWorkingOnTickets);
    }

 
}