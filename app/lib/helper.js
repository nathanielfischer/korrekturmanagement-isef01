/**
 * Konvertiert ein Array von Fächer-Objekten in ein Array von Fächernamen
 * @param {Array} faecherObjectArray - Array von Objekten mit fach-Eigenschaft
 * @returns {Array} Array mit Fächernamen
 */
export function faecherToArray(faecherObjectArray) {
    const faecherArray = [];

    faecherObjectArray.map((faecher) => (
        faecherArray.push(faecher.fach)
    ));

    return faecherArray;
}

/**
 * Konvertiert ein Array von Modul-Objekten in ein Array von Modulnamen
 * @param {Array} moduleObjectArray - Array von Objekten mit modul-Eigenschaft
 * @returns {Array} Array mit Modulnamen
 */
export function moduleToArray(moduleObjectArray) {
    const moduleArray = [];

    moduleObjectArray.map((module) => (
        moduleArray.push(module.modul)
    ));

    return moduleArray;
}

/**
 * Konvertiert ein Array von Quellen-Objekten in ein Array von Quellennamen
 * @param {Array} quellenObjectArray - Array von Objekten mit quelle-Eigenschaft
 * @returns {Array} Array mit Quellennamen
 */
export function quellenToArray(quellenObjectArray) {
    const quelleArray = [];

    quellenObjectArray.map((quellen) => (
        quelleArray.push(quellen.quelle)
    ));

    return quelleArray;
}

/**
 * Konvertiert ein Array von Typen-Objekten in ein Array von Typennamen
 * @param {Array} typenObjectArray - Array von Objekten mit typ-Eigenschaft
 * @returns {Array} Array mit Typennamen
 */
export function typenToArray(typenObjectArray) {
    const typenArray = [];

    typenObjectArray.map((typen) => (
        typenArray.push(typen.typ)
    ));

    return typenArray;
}

