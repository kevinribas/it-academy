const MAX_RODADAS = 25; // Máximo de rodadas de sorteio permitidas

// Adiciona ao objeto sorteio
let sorteio = {
    ativo: false,
    jogadores: [],
    apostas: [],
    idApostaAtual: 1000,
    numerosSorteados: [], // Armazena os números que foram sorteados
    vencedores: [], // Armazena as apostas vencedoras
    rodadas: 0
};

function resetarSorteio() {
    // Limpa o estado atual do sorteio sem reatribuir o objeto
    sorteio.ativo = true;
    sorteio.jogadores = [];
    sorteio.apostas = [];
    sorteio.idApostaAtual = 1000;
    sorteio.numerosSorteados = [];
    sorteio.vencedores = [];
    sorteio.rodadas = 0;
}

function registrarAposta(nome, cpf, numeros) {
    // Cria e adiciona a nova aposta ao array 'apostas'
    sorteio.apostas.push({
        id: sorteio.idApostaAtual++,
        nome,
        cpf,
        numeros
    });

    return true; // Registrado com sucesso
}

function realizarSorteioEApuracao() {
    sorteio.ativo = false; // Finaliza o registro de novas apostas

    let rodada = 0;
    do {
        sorteio.numerosSorteados = []; // Limpa os números sorteados anteriormente

        do {
            const numeroSorteado = Math.floor(Math.random() * 50) + 1;
            if (!sorteio.numerosSorteados.includes(numeroSorteado)) {
                sorteio.numerosSorteados.push(numeroSorteado);
            } else {
                continue; // Se o número já foi sorteado, sorteia outro
            }
        } while (sorteio.numerosSorteados.length < 5);

        sorteio.numerosSorteados = [1,2,3,4,5]; // DEBUG, valores fixos para testes

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

function formatarCpf(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

module.exports = {
    sorteio,
    resetarSorteio,
    registrarAposta,
    realizarSorteioEApuracao,
    formatarCpf,
};
