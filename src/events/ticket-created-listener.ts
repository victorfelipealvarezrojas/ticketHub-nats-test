import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {

    readonly subject = Subjects.TicketCreated;//le asigno el nombrec del evento al cual me estoy suscriviendo
    queueGropuName = 'payments-servive';//nombre del grupo 
    //funcion que dara por finalizado el proceso de recepcion de un eventoy s eejecuta denyro del listener de la clase abstracta y la implemento aqui
    //recive los datos
    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event Data!', data);
        msg.ack();//marco el mensaje como exitoso
    }
}