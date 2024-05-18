function jogadaComputador(){
    const jogadas = ["pedra", "papel", "tesoura"]
    const jogadasAleatorias = Math.floor(Math.random() * jogadas.length)
    return jogadas[jogadasAleatorias]
}

function verificaResultado(jogador, computador){
    if(jogador === computador){
        return "empate"
    }
    
    if(jogador === "pedra" && computador === "tesoura" ||
       jogador === "papel" && computador === "pedra" ||
       jogador === "tesoura" && computador === "papel"
    ){
        return "vitoria"
    }

    return "derrota"
}

function jogo(){
    let placar = 0

    const escolhas = {
        1: "papel",
        2: "pedra",
        3: "tesoura"
    }

    while(1){
        console.log("Escolha sua jogada: 1 - Papel, 2 - Pedra, 3 - Tesoura")
        let numeroJogada = parseInt(prompt("Escolha sua jogada: 1 - Papel, 2 - Pedra, 3 - Tesoura"))
        if (isNaN(numeroJogada) || !escolhas[numeroJogada]) {
            console.log('Opção inválida! Você perdeu a rodada.');
            console.log(`Fim do jogo! Sua pontuação total foi: ${placar}`);
            break;
        }

        let escolhaJogador = escolhas[numeroJogada];
        let escolhaComputador = jogadaComputador();

        console.log(`Você escolheu: ${escolhaJogador}`);
        console.log(`O computador jogou ${escolhaComputador}`);

        let resultado = verificaResultado(escolhaJogador, escolhaComputador);

        if (resultado === 'vitoria') {
            placar++;
            console.log('Você ganhou!');
        } else if (resultado === 'empate') {
            console.log('Esta rodada foi um empate!');
        } else {
            console.log('Você perdeu! A sua pontuação foi de ${placar}');
            break;
        }
    }

}

jogo()