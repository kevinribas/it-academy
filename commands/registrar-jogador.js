const Discord = require("discord.js");
const { registrarJogador, jogadorExistePorCpf } = require("../data/sorteioState.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('registrar-jogador')
        .setDescription('Registra um novo jogador no sistema.')
        .addStringOption(option =>
            option.setName('nome')
                .setDescription('Seu nome completo')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('cpf')
                .setDescription('Seu CPF (somente números)')
                .setRequired(true)),
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'nome',
            description: 'Nome do jogador',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'cpf',
            description: 'CPF do jogador',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            const nome = interaction.options.getString('nome');
            const cpf = interaction.options.getString('cpf');

            if (!nome.trim() || !cpf.trim()) {
                await interaction.reply({ content: 'Você precisa fornecer um nome e um CPF para o registro.', ephemeral: true });
                return;
            }
            if (jogadorExistePorCpf(cpf)) {
                await interaction.reply({ content: 'O CPF informado já está registrado.', ephemeral: true });
                return;
            }
            registrarJogador(nome, cpf);

            await interaction.reply({ content: `Jogador ${nome} registrado com sucesso!`, ephemeral: true });
        }
        catch (error) {
            console.error('Erro ao executar o comando registrar-jogador:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar registrar o jogador.', ephemeral: true }).catch(console.error);
        }
    }
}
