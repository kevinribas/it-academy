// commands/registrar_aposta.js
const Discord = require("discord.js");
const { registrarAposta, jogadorExistePorCpf } = require("../data/sorteioState.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('registrar-aposta')
        .setDescription('Registra uma nova aposta para um jogador existente.')
        .addStringOption(option =>
            option.setName('cpf')
                .setDescription('Seu CPF (somente números)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('numeros')
                .setDescription('Números da aposta separados por vírgula (ex: 1,2,3,4,5) ou surpresinha para números aleatórios.')
                .setRequired(true)),
    type: Discord.ApplicationCommandType.ChatInput,

    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            const cpf = interaction.options.getString('cpf');
            let numeros = interaction.options.getString('numeros');

            if (!jogadorExistePorCpf(cpf)) {
                await interaction.reply({ content: `Erro: CPF não está registrado. Por favor, registre-se antes de fazer uma aposta.`, ephemeral: true });
                return;
            }

            let numerosArray = [];

            // Verifica se o jogador escolheu a opção "surpresinha"
            if (numeros.trim().toLowerCase() === 'surpresinha') {
                const gerarNumeroUnico = (exceto) => {
                    let num;
                    do {
                        num = Math.floor(Math.random() * 50) + 1;
                    } while (exceto.includes(num));
                    return num;
                };

                while (numerosArray.length < 5) {
                    numerosArray.push(gerarNumeroUnico(numerosArray)).sort((a, b) => a - b);
                }
            } else {
                if (!numeros.trim()) {
                    await interaction.reply({ content: 'Você precisa fornecer os numeros ou digitar "surpresinha" para o registro da aposta.', ephemeral: true });
                    return;
                }
                // Converte string de números em array de números
                numerosArray = numeros.split(',').map(n => parseInt(n, 10)).sort((a, b) => a - b);

                // Verifica se todos os números estão no intervalo correto
                if (numerosArray.some(n => n < 1 || n > 50) || numerosArray.length !== 5) {
                    await interaction.reply({ content: 'Erro: Os números da aposta devem ser 5 números únicos entre 1 e 50.', ephemeral: true });
                    return;
                }
            }

            const sucesso = registrarAposta(cpf, numerosArray);

            if (!sucesso) {
                await interaction.reply({ content: `Erro: Não foi possível registrar a aposta. Verifique se o CPF ${cpf} está registrado e tente novamente.`, ephemeral: true });
            } else {
                await interaction.reply({ content: `Aposta registrada com sucesso para ${cpf}! Números: ${numerosArray.join(', ')}`, ephemeral: true });
            }
        } catch (error) {
            console.error('Erro ao executar o comando registrar-aposta:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar registrar a aposta.', ephemeral: true }).catch(console.error);
        }
    }
}