import { arrayNomes } from './main.js';

const timesSorteados = document.querySelector('.times_sorteados');
const sectionFora = document.querySelector('.nomesFora');

export function sortearTimes(qtdTimes) {
    if (arrayNomes.length === 0) {
        alert('Nenhum jogador foi adicionado!');
        return;
    }

    const arrayEmbaralhado = [...arrayNomes].sort(() => Math.random() - 0.5);
    const quantidade = Math.floor(arrayEmbaralhado.length / qtdTimes);

    timesSorteados.style.display = 'block';
    timesSorteados.classList.add('times_sorteados');
    const divTime = document.createElement('div');
    divTime.classList.add('container_sorteados');

    for (let i = 1; i <= qtdTimes; i++) {
        const tituloTime = document.createElement('h2');
        tituloTime.textContent = `Time ${i}`;
        const listaTime = document.createElement('ol');
        listaTime.appendChild(tituloTime);

        divTime.appendChild(listaTime);
        timesSorteados.appendChild(divTime);

        for (let n = 1; n <= quantidade; n++) {
            const itemLista = document.createElement('li');
            itemLista.textContent = `${n}. ${arrayEmbaralhado.shift()}`;
            listaTime.appendChild(itemLista);
        }
    }

    let sobrou = arrayEmbaralhado.length % time;
    console.log(sobrou);
    if(sobrou) {
        document.querySelector('.jogadores_fora').style.display = 'block';
        document.querySelector('.titulo_fora').textContent = `Jogadores de fora [${sobrou}]`;
        const jogadoresFora = document.createElement('p');
        jogadoresFora.textContent = arrayEmbaralhado.join(', ');
        sectionFora.appendChild(jogadoresFora);
    }
}
