const amqp = require('amqplib/callback_api');

amqp.connect(`amqp://localhost`, (err, connection) => {
  if (err) {
    throw err;
  }
  connection.createChannel((err, channel) => {
    if (err) {
      throw err;
    }
    let queueName = "silent";
    let message = {
      id: 11,
      packet_no: 126,
      temperature: 30,
      humidity: 60,
      tds: 1100,
      pH: 5.0
    }
    jsonMessage = JSON.stringify(message);
    channel.assertQueue(queueName, {
      durable: false
    });
    channel.sendToQueue(queueName, Buffer.from(jsonMessage));
    console.log(`Message: ${jsonMessage}`);
    setTimeout(() => {
      connection.close();
    }, 1000)
  })
})
