

const currentTicketlbl = document.querySelector( 'span' );
const currentTicketBtn = document.querySelector( 'button' );

async function getLastTicket() {
    const lasTicket = await fetch('/api/ticket/last').then( resp => resp.json() );
    // console.log(lasTicket)
    currentTicketlbl.innerText = lasTicket
}

async function createTicket() {

    const newTicket = await fetch('/api/ticket',{
        method:'POST',
    }).then( resp => resp.json());
    // console.log(newTicket)

    currentTicketlbl.innerText = newTicket.number;
}

currentTicketBtn.addEventListener('click',createTicket);

getLastTicket();