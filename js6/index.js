var ultimoTempo = 0;
var intervalo = 50;

function criarPonto(x, y) {
    var tempoAtual = new Date().getTime();
    if (tempoAtual - ultimoTempo > intervalo) {
        var ponto = document.createElement('div');
        ponto.className = 'ponto';
        ponto.style.left = x + 'px';
        ponto.style.top = y + 'px';
        
        var container = document.getElementById('container');
        container.insertBefore(ponto, container.firstChild);
        
        if (container.children.length > 8) {
            container.lastChild.remove();
        }
        
        ultimoTempo = tempoAtual;
    }
}

var mouseEmMovimento = false;

document.addEventListener('mousemove', function(event) {
    var x = event.clientX;
    var y = event.clientY;
    
    mouseEmMovimento = true;
    
    criarPonto(x, y);
});

document.addEventListener('mouseout', function() {
    setTimeout(function() {
        mouseEmMovimento = false;
    }, 100);
});

setInterval(function() {
    if (!mouseEmMovimento) {
        var container = document.getElementById('container');
        if (container.children.length > 0) {
            container.lastChild.remove();
        }
    }
}, 100);
