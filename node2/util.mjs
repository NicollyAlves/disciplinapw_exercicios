export function createLink(name, isDirectory) {
    const typeIndicator = isDirectory ? '/' : '';
    return `${name}${typeIndicator}`;
}
