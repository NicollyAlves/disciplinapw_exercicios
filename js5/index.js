(function estiloBase(){
    const divLargura = document.getElementById("inputLargura");
    divLargura.style.marginBottom = "10px";

    const botao = document.getElementById("botao");
    botao.style.padding = "10px";
    botao.style.backgroundColor = "lightblue";
    botao.style.border = "None";
    botao.style.borderRadius = "8px"
})()

function desenhar() {
    const altura1 = document.getElementById("inputBarra1").value;
    const altura2 = document.getElementById("inputBarra2").value;
    const altura3 = document.getElementById("inputBarra3").value;
    const altura4 = document.getElementById("inputBarra4").value;
    const altura5 = document.getElementById("inputBarra5").value;
    const largura = document.getElementById("larguraBarras").value;

    const barra1 = document.getElementById("barra1");
    const barra2 = document.getElementById("barra2");
    const barra3 = document.getElementById("barra3");
    const barra4 = document.getElementById("barra4");
    const barra5 = document.getElementById("barra5");

    barra1.style.height = `${altura1}px`;
    barra2.style.height = `${altura2}px`;
    barra3.style.height = `${altura3}px`;
    barra4.style.height = `${altura4}px`;
    barra5.style.height = `${altura5}px`;

    barra1.style.width = `${largura}px`;
    barra2.style.width = `${largura}px`;
    barra3.style.width = `${largura}px`;
    barra4.style.width = `${largura}px`;
    barra5.style.width = `${largura}px`;

    const barras = document.getElementsByClassName("barra");
    for (let i = 0; i < barras.length; i++) {
        barras[i].style.backgroundColor = "blue";
        barras[i].style.display = "inline-block";
        barras[i].style.margin = "5px";
        barras[i].style.verticalAlign = "bottom";
    }
}