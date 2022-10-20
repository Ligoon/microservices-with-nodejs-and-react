import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
}); // client

// listen to a connect event
// () => {} will be executed after client connected to nats-streaming-server
stan.on('connect', () => {
  console.log('Publisher connected to NATS');
  // we can only share string in nats-streaming server
  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  });
  
  stan.publish('ticket:created', data, () => {
    console.log('Event published');
  });
});