import amqp from 'amqplib/callback_api';

export class SenderMQ {
	constructor(private readonly url: string) {}

	send(queue: string, message: any, autoDisconect: boolean) {
		amqp.connect(this.url, (error0, connection) => {
			if (error0) throw new Error(error0);

			connection.createChannel((error1, channel) => {
				if (error1) throw new Error(error1);

				const msg = JSON.stringify(message);
				channel.assertQueue(queue, {
					durable: false,
				});

				channel.sendToQueue(queue, Buffer.from(msg));
			});

			if (autoDisconect)
				setTimeout(() => {
					connection.close();
					process.exit(0);
				}, 500);
		});
	}
}

export class ConnectionMQ {
	constructor(private readonly url: string) {}

	connect(queue: string, callback: Function) {
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
