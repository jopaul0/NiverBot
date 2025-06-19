const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const sendHappyBirthday = (people) => {
    const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true }
    });

    console.log('🔗 Conectando ao WhatsApp...');

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', async () => {
        console.log('✅ Bot conectado ao WhatsApp');
        await sendCustomMessage();
        await delay(5000);
        await client.destroy();    
        console.log('🚪 Bot finalizado com sucesso.');
        process.exit(0);    
    });

    client.initialize();

    async function sendCustomMessage() {
        const media = MessageMedia.fromFilePath('./frontend/assets/mensagemaniversario.jpeg');

        for (const person of people) {
            const number = person.phone.includes('@c.us') ? person.phone : `${person.phone}@c.us`;

            const firstName = person.name.split(" ")[0].toLowerCase();
            const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
            const message = `🎉 Olá ${formattedName}, a equipe da Onvale deseja um feliz aniversário cheio de realizações! 🎂`;

            try {
                await client.sendMessage(number, media);
                await client.sendMessage(number, message);
                console.log(`✅ Mensagem enviada para ${person.name}`);
            } catch (erro) {
                console.error(`❌ Erro ao enviar para ${person.name}:`, erro);
            }
        }
    }
};

module.exports = { sendHappyBirthday };