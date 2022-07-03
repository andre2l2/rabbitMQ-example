import { MQService } from './lib/mq-service';

const url = 'amqp://localhost:5672';
const mqService = new MQService(url);

mqService.send('foo', { bar: 'foo-bar' });
mqService.consume('foo', (msg: string) => {
	console.log(msg);
});
