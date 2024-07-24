"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("lorem-ipsum");
const lorem = new lorem_ipsum_1.LoremIpsum();
const index = (req, res) => {
    res.end('Welcome to Web academy!');
};
const loremRoute = (req, res) => {
    const num = parseInt(req.params.num, 10);
    if (isNaN(num) || num <= 0) {
        return res.status(400).send('O parâmetro deve ser um número positivo.');
    }
    const paragraphs = lorem.generateParagraphs(num).split('\n');
    const response = paragraphs.map(para => `<p>${para}</p>`).join('');
    res.send(response);
};
const testCookie = (req, res) => {
    if (!("test" in req.cookies)) {
        res.cookie("test", "1");
        res.send("Você ainda não tinha o cookie. Criando...");
    }
    else {
        res.send("Você já tinha o cookie");
    }
};
const hb1 = (req, res) => {
    res.render('main/hb1', {
        mensagem: 'Olá, você está aprendendo Express + HBS!',
    });
};
const hb2 = (req, res) => {
    res.render('main/hb2', {
        poweredByNodejs: true,
        name: 'Express',
        type: 'Framework',
    });
};
const hb3 = (req, res) => {
    const profes = [
        { nome: 'David Fernandes', sala: 1238 },
        { nome: 'Horácio Fernandes', sala: 1233 },
        { nome: 'Edleno Moura', sala: 1236 },
        { nome: 'Elaine Harada', sala: 1231 },
    ];
    res.render('main/hb3', { profes });
};
const hb4 = (req, res) => {
    const technologies = [
        { name: 'Express', type: 'Framework', poweredByNodejs: true },
        { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
        { name: 'React', type: 'Library', poweredByNodejs: true },
        { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
        { name: 'Django', type: 'Framework', poweredByNodejs: false },
        { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
        { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
    ];
    res.render('main/hb4', { technologies });
};
const bemvindo = (req, res) => {
    res.send(`Seja bem-vindo(a) ${req.params.nome}`);
};
const about = (req, res) => {
    res.send("Página about");
};
exports.default = { index, loremRoute, testCookie, hb1, hb2, hb3, hb4, bemvindo, about };
