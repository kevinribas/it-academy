const Discord = require("discord.js");
const { sorteio } = require("../data/sorteioState.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('listar-apostas')
        .setDescription('Lista todas as apostas registradas.'),
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],

    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            // Verificar se existem apostas registradas
            if (sorteio.apostas.length === 0) {
                await interaction.reply({ content: 'Ainda não há apostas registradas.', ephemeral: true });
                return;
            }

            // Construir a mensagem com as informações das apostas
            let mensagemApostas = "Apostas Registradas:\n";
            sorteio.apostas.forEach(aposta => {
                mensagemApostas += `ID: ${aposta.id} - Nome: ${aposta.nome} - Números: ${aposta.numeros.join(', ')}\n`;
            });

            // Verificar o tamanho da mensagem
            // Discord tem um limite de 2000 caracteres por mensagem
            if (mensagemApostas.length > 2000) {
                await interaction.reply({ content: 'Existem muitas apostas para listar aqui. Considere listar por jogador.', ephemeral: true });
                return;
            }

            // Enviar a mensagem com as apostas
            await interaction.reply({ content: mensagemApostas, ephemeral: true });
        }
        catch (error) {
            console.error('Erro ao executar o comando listar-apostas:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar listar as apostas.', ephemeral: true }).catch(console.error);
        }
    }
}
