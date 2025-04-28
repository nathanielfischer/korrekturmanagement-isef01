

export function faecherToArray(faecherObjectArray) {
    const faecherArray = [];

    faecherObjectArray.map((faecher) => (
        faecherArray.push(faecher.fach)
    ));

    return faecherArray;
}


export function moduleToArray(moduleObjectArray) {
    const moduleArray = [];

    moduleObjectArray.map((module) => (
        moduleArray.push(module.modul)
    ));

    return moduleArray;
}

export function quellenToArray(quellenObjectArray) {
    const quelleArray = [];

    quellenObjectArray.map((quellen) => (
        quelleArray.push(quellen.quelle)
    ));

    return quelleArray;
}

