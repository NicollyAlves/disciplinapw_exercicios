"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logFormat = process.env.LOG_FORMAT || 'simples';
const logDir = process.env.LOG_DIR || 'logs';
if (!fs_1.default.existsSync(logDir)) {
    fs_1.default.mkdirSync(logDir);
}
const logger = (req, res, next) => {
    const now = new Date().toISOString();
    const logData = {
        time: now,
        url: req.originalUrl,
        method: req.method,
        httpVersion: req.httpVersion,
        userAgent: req.headers['user-agent'],
    };
    let logMessage;
    if (logFormat === 'simples') {
        logMessage = `${logData.time} - ${logData.method} ${logData.url}\n`;
    }
    else {
        logMessage = `${logData.time} - ${logData.method} ${logData.url} - HTTP/${logData.httpVersion} - ${logData.userAgent}\n`;
    }
    fs_1.default.appendFile(path_1.default.join(logDir, 'access.log'), logMessage, (err) => {
        if (err)
            console.error('Erro ao escrever no log:', err);
    });
    next();
};
exports.default = logger;
