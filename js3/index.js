class IntegerSet {
    constructor(maxValue) {
        this.maxValue = maxValue;
        this.set = new Array(maxValue + 1).fill(false);
    }

    insere(elemento) {
        if (this.isValid(elemento)) {
            this.set[elemento] = true;
        }
    }

    remove(elemento) {
        if (this.isValid(elemento)) {
            this.set[elemento] = false;
        }
    }

    uniao(outro) {
        return this.createResultSet((i) => this.set[i] || outro.set[i]);
    }

    intersecao(outro) {
        return this.createResultSet((i) => this.set[i] && outro.set[i]);
    }

    diferenca(outro) {
        return this.createResultSet((i) => this.set[i] && !outro.set[i]);
    }

    createResultSet(comparator) {
        const resultSet = new IntegerSet(this.maxValue);
        for (let i = 0; i <= this.maxValue; i++) {
            resultSet.set[i] = comparator(i);
        }
        return resultSet;
    }

    toString() {
        return `{ ${this.set.map((isInSet, i) => isInSet ? i : null).filter(i => i !== null).join(', ')} }`;
    }

    isValid(elemento) {
        return elemento >= 0 && elemento <= this.maxValue;
    }
}

const set1 = new IntegerSet(10);
[1, 3, 5].forEach(num => set1.insere(num));

const set2 = new IntegerSet(10);
[3, 4, 5, 7].forEach(num => set2.insere(num));

function atualizaDisplay() {
    document.getElementById('set1').textContent = `${set1.toString()}`;
    document.getElementById('set2').textContent = `${set2.toString()}`;
}

function insereElemento(setNumber) {
    const elemento = parseInt(prompt(`Insira o elemento para adicionar no Conjunto ${setNumber} (0 a 10):`));
    if (elemento < 0 || elemento > 10 || isNaN(elemento)) {
        alert("Por favor, insira um número entre 0 e 10.");
        return;
    }
    if (setNumber === 1) {
        set1.insere(elemento);
    } else if (setNumber === 2) {
        set2.insere(elemento);
    }
    atualizaDisplay();
}

function removeElemento(setNumber) {
    const elemento = parseInt(prompt(`Insira o elemento para remover do Conjunto ${setNumber} (0 a 10):`));
    if (elemento < 0 || elemento > 10 || isNaN(elemento)) {
        alert("Por favor, insira um número entre 0 e 10.");
        return;
    }
    if (setNumber === 1) {
        set1.remove(elemento);
    } else if (setNumber === 2) {
        set2.remove(elemento);
    }
    atualizaDisplay();
}

function uniaoSets() {
    const uniaoSet = set1.uniao(set2);
    document.getElementById('union').textContent = `União: ${uniaoSet.toString()}`;
}

function intersecaoSets() {
    const intersecaoSet = set1.intersecao(set2);
    document.getElementById('intersection').textContent = `Interseção: ${intersecaoSet.toString()}`;
}

function diferencaSets() {
    const diferencaSet = set1.diferenca(set2);
    document.getElementById('difference').textContent = `Diferença: ${diferencaSet.toString()}`;
}

atualizaDisplay();
