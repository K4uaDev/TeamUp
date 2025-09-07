// script.js
import { adicionarJogador } from './main.js';
import { sortearTimes } from './randomTeam.js';

const btnAdicionar = document.getElementById("adicionar");
const btnSorteio = document.getElementById("sortear");

btnAdicionar.addEventListener('click', adicionarJogador);

btnSorteio.addEventListener('click', () => {
    const times = parseInt(document.getElementById('quantidade').value);
    if (!isNaN(times) && times > 0) {
        sortearTimes(times);
    } else {
        alert("Digite uma quantidade válida de times.");
    }
});
