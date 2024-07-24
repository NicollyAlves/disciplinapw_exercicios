"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const major_1 = require("../service/major");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const majors = yield (0, major_1.getMajors)();
        res.render("major/index", { majors });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === "GET") {
        res.render("major/create");
    }
    else {
        try {
            yield (0, major_1.createMajor)(req.body);
            res.redirect("/major");
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const major = yield (0, major_1.getMajor)(id);
        res.render("major/read", { major });
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (req.method === "GET") {
        try {
            const major = yield (0, major_1.getMajor)(id);
            res.render("major/update", { major });
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
    else {
        try {
            yield (0, major_1.updateMajor)(id, req.body);
            res.redirect("/major");
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!id) {
            throw new Error('ID do major não fornecido.');
        }
        yield (0, major_1.removeMajor)(id);
        res.redirect("/major");
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Erro ao deletar o major porque ele possui um usuário cadastrado nele.');
    }
});
exports.default = { index, create, read, update, remove };
