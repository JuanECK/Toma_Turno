
//Referencias HTML
const lblPending = document.querySelector('#lbl-pending')
const deskLbl = document.getElementById('deskLbl')
const noMoreAlert = document.getElementById('alert')
const btnDraw = document.getElementById('btn-draw')
const btnDone = document.getElementById('btn-done')
const currentTicketLbl = document.getElementById('smallT')

const searchParams = new URLSearchParams( window.location.search )
if( !searchParams.has('escritorio') ){
    window.location = 'index.html'
    throw new Error('Escritorio es requerido')
}

const deskNumber = searchParams.get('escritorio');
let workingTicket = null;
deskLbl.innerHTML = deskNumber

function checkTicketCount( currentCount = 0 ){
    if(currentCount === 0){
        noMoreAlert.classList.remove('d-none');
    }else{
        noMoreAlert.classList.add('d-none');
    }
    lblPending.innerHTML = currentCount
}

async function loadInitialCount() {
    const pendingTickets = await fetch('/api/ticket/pending').then( resp => resp.json() );
    lblPending.innerHTML = pendingTickets.length || 0;
    checkTicketCount(pendingTickets.length)
}

async function getTicket(){
    await finishTicked();

    const { status, Ticket, message } = await fetch(`/api/ticket/draw/${ deskNumber }`).then( resp => resp.json() );
    if( status === 'error' ){
        currentTicketLbl.innerHTML = message;
        return
    }
    workingTicket = Ticket;
    console.log(Ticket)
    currentTicketLbl.innerHTML = Ticket.number
}

async function finishTicked() {
    if( !workingTicket ) return;
    const { status, message } = await fetch(`/api/ticket/done/${ workingTicket.id }`, {
        method:'PUT',
    }).then( resp => resp.json() );
    console.log({status, message})
    if( status === 'ok' ){
        workingTicket = null;
        currentTicketLbl.innerHTML = 'Nadie'
    }
}

function connectToWebSockets() {
    
    const socket = new WebSocket( 'ws://localhost:3200/ws' );
    
    socket.onmessage = ( event ) => {
        // console.log(event.data); // on-ticket-count-change
        const {type, payload} = JSON.parse( event.data )
        if( type !== 'on-ticket-count-changed' ) return
        checkTicketCount(payload)
    };
    
    socket.onclose = ( event ) => {
        console.log( 'Connection closed' );
        setTimeout( () => {
            console.log( 'retrying to connect' );
            connectToWebSockets();
        }, 1500 );
        
    };
    
    socket.onopen = ( event ) => {
        console.log( 'Connected' );
    };
    
}

//listeners
btnDraw.addEventListener('click', getTicket );
btnDone.addEventListener('click', finishTicked );

loadInitialCount();
connectToWebSockets();