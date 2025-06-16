

export interface Ticket{

    id:string,
    number:number,
    createAt:Date,
    done:boolean,
    handleDoneAt:Date
    handleAtDesk?: string,
    handleAt?:Date,

}