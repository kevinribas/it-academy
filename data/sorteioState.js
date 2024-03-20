const MAX_RODADAS = 25; // Máximo de rodadas de sorteio permitidas

// Adiciona ao objeto sorteio
let sorteio = {
    ativo: false,
    jogadores: [],
    apostas: [],
    idApostaAtual: 1000,
    numerosSorteados: [], // Armazena os números que foram sorteados
    vencedores: [] // Armazena as apostas vencedoras
};

function resetarSorteio() {
    // Limpa o estado atual do sorteio sem reatribuir o objeto
    sorteio.ativo = true;
    sorteio.jogadores = [];
    sorteio.apostas = [];
    sorteio.idApostaAtual = 1000;
    sorteio.numerosSorteados = [];
    sorteio.vencedores = [];
}

function registrarJogador(nome, cpf) {
    // Adiciona um novo jogador diretamente ao array 'jogadores'
    sorteio.jogadores.push({ nome, cpf });
}

function registrarAposta(cpf, numeros) {
    // Cria e adiciona a nova aposta ao array 'apostas'
    sorteio.apostas.push({
        id: sorteio.idApostaAtual++,
        cpf,
        numeros
    });

    return true; // Registrado com sucesso
}

function jogadorExistePorCpf(cpf) {
    // Verifica se o jogador já está registrado
    return sorteio.jogadores.some(jogador => jogador.cpf === cpf);
}

function realizarSorteioEApuracao() {
    sorteio.ativo = false; // Finaliza o registro de novas apostas

    let rodada = 0;
    do {
        // Sorteio de números
        if (sorteio.numerosSorteados.length < 5 + rodada) {
            const numeroSorteado = Math.floor(Math.random() * 50) + 1;
            if (!sorteio.numerosSorteados.includes(numeroSorteado)) {
                sorteio.numerosSorteados.push(numeroSorteado);
            } else {
                continue; // Se o número já foi sorteado, sorteia outro
            }
        }

        // Apuração de vencedores
        sorteio.vencedores = sorteio.apostas.filter(aposta =>
            aposta.numeros.every(num => sorteio.numerosSorteados.includes(num))
        );

        rodada++;
    } while (sorteio.vencedores.length === 0 && rodada < MAX_RODADAS);

    return {
        numerosSorteados: sorteio.numerosSorteados,
        vencedores: sorteio.vencedores,
        rodadas: rodada
    };
}

module.exports = {
    sorteio,
    resetarSorteio,
    registrarJogador,
    registrarAposta,
    realizarSorteioEApuracao,
    jogadorExistePorCpf
};
