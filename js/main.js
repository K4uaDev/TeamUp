const nomeJogador = document.getElementById("nome_add");
const nomesAdicionados = document.querySelector(".adicionados");
export const arrayNomes = [];

export function adicionarJogador() {
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

    arrayNomes.push(nome);
    console.log(arrayNomes);
    nomeJogador.value = "";

    img.addEventListener('click', () => {
        p.remove();
    });
}
