import { ConnectionMQ, SenderMQ } from './lib/Mq';

const url = 'amqp://localhost:5672';
const senderMQ = new SenderMQ(url);
const connectionMQ = new ConnectionMQ(url);

connectionMQ.connect('test1', (msg: string) => {
	console.log(msg);
});

senderMQ.send('test1', { name: 'Andre Ferreira' }, true);
