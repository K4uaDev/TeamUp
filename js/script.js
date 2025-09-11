const nomeJogador = document.getElementById("nome_add");
const nomesAdicionados = document.querySelector(".adicionados");
const timesSorteados = document.querySelector('.times_sorteados');
const sectionFora = document.querySelector('.nomesFora');
let numjogadores = document.querySelector('.info_title');


const arrayNomes = [];

function adicionarJogador() {
    const nome = nomeJogador.value;

    function ajustarNome(n) {
        return n.charAt(0).toUpperCase() + n.slice(1);
    }

    if (!nome.trim()) {
        alert("Preencha os campos corretamente!");
        nomeJogador.value = "";
        return;
    }

    const p = document.createElement('p');
    p.textContent = ajustarNome(nome);
    let img = new Image();
    img.src = 'img/delete.png';

    p.appendChild(img);
    nomesAdicionados.appendChild(p);

    arrayNomes.push(ajustarNome(nome));
    nomeJogador.value = "";

    img.addEventListener('click', () => {
        p.remove();
        const nomeParaRemover = p.textContent.replace("delete.png", "").trim();
        const index = arrayNomes.indexOf(nomeParaRemover);
        if (index !== -1) arrayNomes.splice(index, 1);

        numjogadores.textContent = `Jogadores [${arrayNomes.length}]`;
    });

    numjogadores.textContent = `Jogadores [${arrayNomes.length}]`;
}

function sortearTimes(qtdTimes) {
    if (arrayNomes.length < qtdTimes) {
        alert(`É necessário ter pelo menos ${qtdTimes} jogadores para sortear ${qtdTimes} times.`);
        return;
    }

    const arrayEmbaralhado = [...arrayNomes].sort(() => Math.random() - 0.5);
    const quantidadePorTime = Math.floor(arrayEmbaralhado.length / qtdTimes);
    const times = Array.from({ length: qtdTimes }, () => []);
    const proximos = [];

    let jogadorIndex = 0;
    for (let i = 0; i < qtdTimes; i++) {
        for (let j = 0; j < quantidadePorTime; j++) {
            times[i].push(arrayEmbaralhado[jogadorIndex]);
            jogadorIndex++;
        }
    }

    if (jogadorIndex < arrayEmbaralhado.length) {
        proximos.push(...arrayEmbaralhado.slice(jogadorIndex));
    }
    
    timesSorteados.innerHTML = "";
    sectionFora.innerHTML = "";
    timesSorteados.style.display = 'block';
    
    const tituloSorteados = document.createElement('h1');
    tituloSorteados.className = 'titulo_sorteados';
    tituloSorteados.textContent = 'Times Sorteados';
    timesSorteados.appendChild(tituloSorteados);
    
    const containerTimes = document.createElement('div');
    containerTimes.className = 'container_sorteados';

    times.forEach((time, i) => {
        const lista = document.createElement("ol");
        const titulo = document.createElement("h2");
        titulo.textContent = `Time ${i + 1}`;
        lista.appendChild(titulo);
        
        time.forEach((jogador) => {
            const item = document.createElement("li");
            item.textContent = jogador;
            lista.appendChild(item);
        });
        containerTimes.appendChild(lista);
    });
    timesSorteados.appendChild(containerTimes);

    if (proximos.length > 0) {
        document.querySelector('.jogadores_fora').style.display = 'block';
        document.querySelector('.titulo_fora').textContent = `Próximos [${proximos.length}]`;
        const jogadoresFora = document.createElement('p');
        jogadoresFora.textContent = proximos.join(', ');
        sectionFora.appendChild(jogadoresFora);
    } else {
        document.querySelector('.jogadores_fora').style.display = 'none';
    }
}

function limparTudo() {
    arrayNomes.length = 0;
    nomesAdicionados.innerHTML = "";
    timesSorteados.innerHTML = "";
    timesSorteados.style.display = 'none';
    sectionFora.innerHTML = "";
    document.querySelector('.jogadores_fora').style.display = 'none';
    document.getElementById('quantidade').value = "";
    nomeJogador.value = "";
}

const btnAdicionar = document.getElementById("adicionar");
const btnSorteio = document.getElementById("sortear");
const btnLimpar = document.getElementById("limpar");

btnAdicionar.addEventListener('click', adicionarJogador);
nomeJogador.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        adicionarJogador();
    }
});
btnSorteio.addEventListener('click', () => {
    const times = parseInt(document.getElementById('quantidade').value);
    if (!isNaN(times) && times > 0) {
        sortearTimes(times);
    } else {
        alert("Digite uma quantidade de times.");
    }
});

btnLimpar.addEventListener('click', limparTudo);