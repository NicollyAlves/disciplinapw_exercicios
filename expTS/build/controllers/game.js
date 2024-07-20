"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getGame = (req, res) => {
    res.render('/major', {
        body: res.render('game', { layout: false }) // Renderiza o conteúdo específico do jogo dentro do layout principal
    });
};
exports.default = { getGame };
