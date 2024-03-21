const Discord = require("discord.js");
const { realizarSorteioEApuracao } = require("../data/sorteioState.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('sortear')
        .setDescription('Finaliza o registro de apostas e realiza o sorteio e a apuração.'),
    type: Discord.ApplicationCommandType.ChatInput,
    options: [],

    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            const { numerosSorteados, vencedores, rodadas } = realizarSorteioEApuracao();
            numerosSorteados.sort((a, b) => a - b);

            let mensagemResultado = `Sorteio finalizado após ${rodadas} rodada(s). Números sorteados: ${numerosSorteados.join(', ')}.`;

            if (vencedores.length === 0) {
                mensagemResultado += ' Nenhum vencedor nesta edição.';
            } else {
                mensagemResultado += ` Vencedor(es): ${vencedores.map(v => v.nome).join(', ')}.`;
            }

            await interaction.reply({ content: mensagemResultado, ephemeral: false });
        } catch (error) {
            console.error('Erro ao executar o comando finalizar-apostas:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar finalizar as apostas.', ephemeral: true }).catch(console.error);
        }
    }
}
