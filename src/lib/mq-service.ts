import amqp from 'amqplib/callback_api';

export class MQService {
	constructor(private readonly url: string) {}

	private toBuffer(message: any): Buffer {
		const msg = JSON.stringify(message);
		return Buffer.from(msg);
	}

	send(queue: string, message: any) {
		amqp.connect(this.url, (error0, connection) => {
			if (error0) throw new Error(error0);

			connection.createChannel((error1, channel) => {
				if (error1) throw new Error(error1);

				channel.assertQueue(queue, {
					durable: false,
				});

				channel.sendToQueue(queue, this.toBuffer(message));
			});
		});
	}

	consume(queue: string, callback: Function) {
		amqp.connect(this.url, (error0, connection) => {
			if (error0) throw new Error(error0);

			connection.createChannel((error1, channel) => {
				if (error1) throw new Error(error1);

				channel.assertQueue(queue, {
					durable: false,
				});

				channel.consume(
					queue,
					(msg: any) => {
						callback(msg.content.toString());
					},
					{
						noAck: true,
					}
				);
			});
		});
	}
}
