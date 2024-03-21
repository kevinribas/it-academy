const { SlashCommandBuilder } = require('discord.js');
const { sorteio } = require("../data/sorteioState.js");

const premiosDivertidos = [
    "Um abraço de um urso de pelúcia gigante, entregue por drone",
    "Uma plantação virtual de batatas",
    "Um diploma de PhD em Procrastinação da Universidade da Preguiça",
    "Um par de havaianas encardido que se autolimpa de acordo com o tempo",
    "Uma máquina de fazer bolhas de sabão gigantes",
    "Um kit de primeiros socorros para corações partidos",
    "Um jantar com o seu personagem de videogame favorito",
    "Uma passagem para uma viagem até a Lua (somente ida, a volta é por sua conta)",
    "Uma invisibilidade para mosquitos – eles ainda estão lá, mas agora te ignoram",
    "Um clone holográfico para participar de reuniões no seu lugar",
    "Uma vassoura do modelo Nimbus 2000 (não voa, mas é ótima para varrer)",
    "Um mapa do tesouro (tesouro não garantido)",
    "Um aluguel de nuvem pessoal para sonhar acordado",
    "Um controle remoto universal (mas só controla abajures)",
    "Uma lâmpada mágica com um gênio que só sabe contar piadas ruins",
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('premiacao')
        .setDescription('Calcula e anuncia os prêmios humorísticos das apostas vencedoras.'),
    async execute(interaction) {
        if (!interaction.isCommand()) return;
        try {
            if (sorteio.vencedores.length === 0) {
                await interaction.reply("Não houve vencedores neste sorteio. Todos ganham um dia extra de sorte!");
                return;
            }
    
            let resposta = "Parabéns aos vencedores! Aqui estão os seus prêmios mirabolantes:\n\n";
    
            sorteio.vencedores.forEach(vencedor => {
                const premioAleatorio = premiosDivertidos[Math.floor(Math.random() * premiosDivertidos.length)];
                resposta += `${vencedor.nome} ganha: ${premioAleatorio}\n`;
            });
    
            await interaction.reply(resposta);
        } catch (error) {
            console.error('Erro ao executar o comando premiacao:', error);
            await interaction.reply({ content: 'Ocorreu um erro ao tentar calcular os prêmios.', ephemeral: true }).catch(console.error);
        }
        
    }
};
