const Discord = require("discord.js");
const { sorteio, resetarSorteio } = require("../data/sorteioState.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('iniciar')
        .setDescription('Inicia uma nova rodada de apostas.'),
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],

    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            if (sorteio.ativo) {
                resetarSorteio();
                await interaction.reply('Sorteio reiniciado. As apostas anteriores foram descartadas. Você pode registrar suas apostas agora!');
            } else {
                sorteio.ativo = true;
                await interaction.reply('A rodada de apostas foi iniciada! Você pode começar a fazer suas apostas.');
            }
        } catch (error) {
            console.error('Erro ao executar o comando iniciar:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar iniciar a rodada de apostas.', ephemeral: true }).catch(console.error);
        }
    },
}
