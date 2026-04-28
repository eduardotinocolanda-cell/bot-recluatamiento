const wppconnect = require('@wppconnect-team/wppconnect');
const flujo = require('./flujo.json');

wppconnect.create({
  session: 'bot-reclutamiento',
  headless: true,
  useChrome: false,
  browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(client => {
  console.log('✅ Bot conectado a WhatsApp');

  client.onMessage(message => {
    console.log('📩 Mensaje recibido:', message.body);

    // Busca la respuesta en flujo.json según el texto recibido
    const nodo = flujo[message.body];
    if (nodo) {
      client.sendText(message.from, nodo.message)
        .then(() => console.log(`➡️ Respuesta enviada: ${nodo.message}`))
        .catch(err => console.error('❌ Error al enviar mensaje:', err));
    } else {
      client.sendText(message.from, 'No entendí tu respuesta, intenta otra vez.')
        .then(() => console.log('➡️ Respuesta enviada: fallback'))
        .catch(err => console.error('❌ Error al enviar mensaje:', err));
    }
  });

}).catch(err => {
  console.error('❌ Error al iniciar el bot:', err);
});
