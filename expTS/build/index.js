"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./middleware/logger"));
const morgan_1 = __importDefault(require("morgan"));
const express_handlebars_1 = require("express-handlebars");
const helpers_1 = require("./views/helpers/helpers");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_sass_middleware_1 = __importDefault(require("node-sass-middleware"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const uuid_1 = require("uuid");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use((0, node_sass_middleware_1.default)({
    src: `${__dirname}/../public/scss`,
    dest: `${__dirname}/../public/css`,
    outputStyle: "compressed",
    prefix: "/css",
}));
app.use("/css", express_1.default.static(`${__dirname}/../public/css`));
app.use('/img', [
    express_1.default.static(`${__dirname}/public/img`)
]);
app.use(logger_1.default);
app.use((0, morgan_1.default)('combined'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    genid: () => (0, uuid_1.v4)(),
    secret: "SmD4#se12aweKasdmasdf",
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 360000 }
}));
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/game', express_1.default.static(path_1.default.join(__dirname, 'game')));
app.use(routes_1.default);
app.locals.valor = "10";
app.engine("handlebars", (0, express_handlebars_1.engine)({
    helpers: { listTechnologies: helpers_1.listTechnologies }
}));
app.set("view engine", "handlebars");
app.set("views", `./src/views`);
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
