const { exec } = require('child_process');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { sorteio } = require("./data/sorteioState.js");

// dotenv
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

// Cria o cliente e define permissões
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],
});
client.commands = new Collection();

// Importa os comandos
const fs = require('fs');
const path = require('path');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.error(`O comando em ${filePath} não possui a estrutura correta.`);
    }
}


client.once(Events.ClientReady, readyClient => {
    console.log(`${readyClient.user.tag} está online!`);
});

client.login(TOKEN);

// Listener de interações
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`Comando não encontrado.`);
        return;
    };
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply('Ocorreu um erro ao executar o comando.');
    }
});