const wppconnect = require('@wppconnect-team/wppconnect');
const flujo = require('./flujo.json');

wppconnect.create({
  session: 'bot-reclutamiento',
  headless: true,
  useChrome: false
}).then(client => {
  console.log('✅ Bot conectado a WhatsApp');

  client.onMessage(message => {
    // Busca la respuesta en flujo.json según el texto recibido
    const nodo = flujo[message.body];
    if (nodo) {
      client.sendText(message.from, nodo.message);
    } else {
      client.sendText(message.from, 'No entendí tu respuesta, intenta otra vez.');
    }
  });
}).catch(err => console.error('❌ Error al iniciar el bot:', err));
