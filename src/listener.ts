import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const clientStan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

clientStan.on('connect', () => {
    console.log('Listen connected to NATS');

    //TicketCreatedListener es una clase
    new TicketCreatedListener(clientStan).listen();

    //me asiguro de cuando el cliente sea eliminado el proceso se cierre y no continue emitiendo estados de recepcionado de eventos
    clientStan.on('close', () => {
        console.log('NATS connection closed!!!!');
        process.exit();//reacciona a la accion de cerrar el cliente inculso desde la consola
    });
});

process.on('SIGINT', () => clientStan.close());//cuando se elimine el cliente incluso desde la consola cerrara todo
process.on('SIGTERM', () => clientStan.close());






