<div align="center">
<img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Faphyr.com%2Fdata%2Fposts%2F315%2FRabbitMQ.sh-600x600.png&f=1&nofb=1" width="300px"/>

<h1>RabbitMQ Example</h1>
</div>

## How to run

### Docker run

```bash
docker run -d -p 15672:15672 -p 5672:5672 --hostname my-rabbit --name some-rabbit rabbitmq:3-management
```

### Ports

- GUI interface port on: **15672**
- AMQP protocol port on: **5672**

### Default Auth

| Protocol | Port  | Login | Passowrd |
| -------- | ----- | ----- | -------- |
| HTTP     | 15672 | guest | guest    |
| AMQP     | 5672  | -     | -        |
