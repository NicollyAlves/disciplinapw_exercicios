function calcular(): void {
    const radiusInput = document.getElementById('radius') as HTMLInputElement;
    const radiusValue = radiusInput.value;
    const radius = parseFloat(radiusValue);

    if (radiusValue === "" || radius <= 0) {
        alert("Por favor, insira um raio válido maior que zero.");
        return;
    }

    const pi: number = Math.PI;
    const area: number = pi * Math.pow(radius, 2);
    const circumference: number = 2 * pi * radius;

    const resultElement = document.getElementById('result') as HTMLElement;
    resultElement.innerHTML = `
        <p>Área: ${area.toFixed(2)} unidades quadradas</p>
        <p>Circunferência: ${circumference.toFixed(2)} unidades</p>
    `;
}
