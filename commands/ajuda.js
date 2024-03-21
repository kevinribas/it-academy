const { SlashCommandBuilder, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ajuda')
        .setDescription('Exibe uma lista de todos os comandos disponíveis e suas descrições.'),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            const helpEmbed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Comandos Disponíveis')
                .setDescription('Aqui estão os comandos que você pode usar:');

            interaction.client.commands.forEach((command) => {
                let commandDescription = command.data.description;

                // Verifica se o comando tem opções e as adiciona à descrição
                if (command.data.options?.length) {
                    commandDescription += "\nInputs:";
                    command.data.options.forEach(opt => {
                        const optionType = ApplicationCommandOptionType[opt.type];
                        commandDescription += `\n- ${opt.name} (${optionType}): ${opt.description}`;
                    });
                }

                helpEmbed.addFields({ name: `/${command.data.name}`, value: commandDescription, inline: false });
            });

            await interaction.reply({ embeds: [helpEmbed] });
        } catch (error) {
            console.error('Erro ao executar o comando ajuda:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar exibir a ajuda.', ephemeral: true }).catch(console.error);
        }
    },
};
