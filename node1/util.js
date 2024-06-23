function createLink(name, isDirectory) {
    return isDirectory ? `[DIR] ${name}` : name;
}

module.exports = { createLink };
