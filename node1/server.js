const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const { createLink } = require("./util");

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

const app = express();
const port = process.env.PORT || 3000;
const baseDirectory = process.cwd();

app.get("/", (req, res) => {
    let requestedPath = req.query.dir ? path.resolve(baseDirectory, req.query.dir) : baseDirectory;

    fs.stat(requestedPath, (err, stats) => {
        if (err) {
            return res.status(500).send(`Erro ao acessar o caminho: ${err.message}`);
        }

        if (stats.isDirectory()) {
            fs.readdir(requestedPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    return res.status(500).send(`Erro ao ler o diretório: ${err.message}`);
                }

                let fileList = files.map(file => {
                    const filePath = path.join(req.query.dir || "", file.name);
                    const linkText = createLink(file.name, file.isDirectory());
                    return `<li><a href="?dir=${encodeURIComponent(filePath)}">${linkText}</a></li>`;
                }).join("");

                const parentDir = path.dirname(req.query.dir || "");

                res.send(`
                    <html>
                    <body>
                        <ul>
                            ${fileList}
                        </ul>
                        ${req.query.dir ? `<a href="?dir=${encodeURIComponent(parentDir)}">Voltar</a><br>` : ""}
                    </body>
                    </html>
                `);
            });
        } else {
            fs.readFile(requestedPath, "utf8", (err, data) => {
                if (err) {
                    return res.status(500).send(`Erro ao ler o arquivo: ${err.message}`);
                }
                
                const parentDir = path.dirname(req.query.dir || "");
                res.send(`
                    <html>
                    <body>
                        <pre>${data}</pre>
                        <br>
                        <a href="?dir=${encodeURIComponent(parentDir)}">Voltar</a><br>
                    </body>
                    </html>
                `);
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
