"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTechnologies = listTechnologies;
function listTechnologies(technologies) {
    const list = technologies
        .filter(p => p.poweredByNodejs)
        .map((p) => `<li>${p.name} - ${p.type}</li>`);
    return `<ul>${list.join('')}</ul>`;
}
