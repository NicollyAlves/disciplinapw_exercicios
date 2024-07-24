import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const logFormat = process.env.LOG_FORMAT || 'simples';
const logDir = process.env.LOG_DIR || 'logs';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = (req: Request, res: Response, next: NextFunction) => {
  const now = new Date().toISOString();
  const logData = {
    time: now,
    url: req.originalUrl,
    method: req.method,
    httpVersion: req.httpVersion,
    userAgent: req.headers['user-agent'],
  };

  let logMessage: string;

  if (logFormat === 'simples') {
    logMessage = `${logData.time} - ${logData.method} ${logData.url}\n`;
  } else {
    logMessage = `${logData.time} - ${logData.method} ${logData.url} - HTTP/${logData.httpVersion} - ${logData.userAgent}\n`;
  }

  fs.appendFile(path.join(logDir, 'access.log'), logMessage, (err) => {
    if (err) console.error('Erro ao escrever no log:', err);
  });

  next();
};

export default logger;
