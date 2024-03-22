const { SlashCommandBuilder } = require('discord.js');
const { sorteio } = require("../data/sorteioState.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resultado')
        .setDescription('Exibe os resultados finais após a apuração.'),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            sorteio.numerosSorteados.sort((a, b) => a - b);
            const numerosSorteados = sorteio.numerosSorteados.join(', ');
            const rodadas = sorteio.rodadas;
            const apostasVencedoras = sorteio.vencedores.length;
            const nomesVencedores = sorteio.vencedores
                .sort((a, b) => a.nome.localeCompare(b.nome))
                .map(v => v.nome)
                .join(', ') || 'Não houve vencedores';

            // Contabilização e ordenação dos números apostados
            const contagemNumeros = {};
            sorteio.apostas.forEach(aposta => {
                aposta.numeros.forEach(numero => {
                    contagemNumeros[numero] = (contagemNumeros[numero] || 0) + 1;
                });
            });

            const numerosMaisApostados = Object.entries(contagemNumeros)
                .sort((a, b) => b[1] - a[1])
                .map(([numero, qtd]) => `${numero} | ${qtd}`)
                .join('\n');

            // Construção da mensagem de resposta
            let resposta = `Números sorteados: ${numerosSorteados}\n` +
                `Rodadas de sorteio: ${rodadas}\n` +
                `Quantidade de apostas vencedoras: ${apostasVencedoras}\n` +
                `Apostas vencedoras: ${nomesVencedores}\n` +
                `Números apostados (Mais escolhidos ao menos escolhidos):\n${numerosMaisApostados}`;

            await interaction.reply({ content: resposta, ephemeral: false });
        } catch (error) {
            console.error('Erro ao executar o comando fim-apuracao:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar exibir os resultados finais.', ephemeral: true }).catch(console.error);
        }
    },
};
