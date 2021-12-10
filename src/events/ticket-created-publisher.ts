import { Publisher } from "./base-publisher";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {

    readonly subject = Subjects.TicketCreated;//le asigno el nombrec del evento al cual me estoy suscriviendo


}