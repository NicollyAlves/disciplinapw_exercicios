function calcular() {
    const radius = document.getElementById('radius').value;
    if (radius === "" || radius <= 0) {
        alert("Por favor, insira um raio válido maior que zero.");
        return;
    }

    const pi = Math.PI;
    const area = pi * Math.pow(radius, 2);
    const circumference = 2 * pi * radius;

    document.getElementById('result').innerHTML = `
        <p>Área: ${area.toFixed(2)} unidades quadradas</p>
        <p>Circunferência: ${circumference.toFixed(2)} unidades</p>
    `;
}