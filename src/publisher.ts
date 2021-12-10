import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

//me permite conectarme de forma directa la pods del nats sin archivo de configuracion y mientras la cosnola se este ejecutando
//kubectl port-forward nats-streaming-deployment-5db886565-r54x7 4222:4222  --esto lo aplico al pod que implementa el deployment de kubernetes
const clientStan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222' //aqui la tiro al localhost segun la configuracion kubectl port-forward nats-streaming-deployment-5db886565-r54x7 4222:4222 
});


clientStan.on('connect', async () => {
    console.log('publisher connected to NATS');

    const publisher = new TicketCreatedPublisher(clientStan);

    try {
        await publisher.publish({
            id: '123fr3453',
            title: 'ticker 123',
            price: 20
        });
    } catch (error) {
        console.error(error);
    }


    /*const data = JSON.stringify({
        id: '123fr3453',
        title: 'ticker 123',
        price: 20
    });

    //'ticket:created' es el nombre del canal que estoy creando
    clientStan.publish('ticket:created', data, () => {
        console.log('Event published');
    });*/

});