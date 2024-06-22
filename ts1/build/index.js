"use strict";
function calcular() {
    const radiusInput = document.getElementById('radius');
    const radiusValue = radiusInput.value;
    const radius = parseFloat(radiusValue);
    if (radiusValue === "" || radius <= 0) {
        alert("Por favor, insira um raio válido maior que zero.");
        return;
    }
    const pi = Math.PI;
    const area = pi * Math.pow(radius, 2);
    const circumference = 2 * pi * radius;
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p>Área: ${area.toFixed(2)} unidades quadradas</p>
        <p>Circunferência: ${circumference.toFixed(2)} unidades</p>
    `;
}
