document.getElementById('stressForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calcularEstresse();
});

function calcularEstresse() {
    const respostas = Array.from(document.querySelectorAll('input[type="radio"]:checked')).map(input => parseInt(input.value));

    if (respostas.length < 24) {
        alert('Por favor, responda todas as perguntas antes de enviar.');
        return;
    }

    const categorias = {
        relacaoComUtentes: [2, 8, 13, 21],
        relacaoComChefias: [12, 20, 24],
        relacaoComColegas: [4, 17, 22],
        excessoDeTrabalho: [5, 10, 11, 16],
        carreiraERemuneracao: [1, 6, 15, 19],
        problemasFamiliares: [3, 14, 23],
        condicoesDeTrabalho: [7, 9, 18]
    };

    function calcularTotal(indices) {
        return indices.reduce((total, indice) => total + respostas[indice - 1], 0);
    }

    const totais = {};
    for (const [categoria, indices] of Object.entries(categorias)) {
        totais[categoria] = calcularTotal(indices);
    }

    function determinarNivelDeEstresse(total) {
        if (total <= 1) return 'Baixos níveis de stress';
        if (total > 1 && total <= 3) return 'Níveis moderados de stress';
        if (total > 3) return 'Níveis elevados de stress';
    }

    for (const [categoria, total] of Object.entries(totais)) {
        const resultado = document.getElementById(categoria);
        resultado.textContent = `${categoria}: ${determinarNivelDeEstresse(total)}`;
    }
}
