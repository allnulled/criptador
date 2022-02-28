const fs = require("fs");
const Criptador = require(__dirname + "/../src/index.js");
const pwd = "Hola que tal";
const texto1 = "Érase una vez, un pepito grillo";

const main = async function() {
    const textoEncriptado = Criptador.encrypt(texto1, pwd);
    const textoDesencriptado = Criptador.decrypt(textoEncriptado, pwd);
    if(texto1 !== textoDesencriptado) {
        throw new Error("Texto encriptado y desencriptado difieren:" + textoEncriptado + "\n" + textoDesencriptado);
    }
    const beforeEncryptContents = fs.readFileSync(__dirname + "/files/source-1.js").toString();
    Criptador.encryptFiles(__dirname + "/files", pwd);
    const beforeDecryptContents = fs.readFileSync(__dirname + "/files/source-1.js").toString();
    Criptador.decryptFiles(__dirname + "/files", pwd);
    const decryptedContents = fs.readFileSync(__dirname + "/files/source-1.js").toString();
    if(beforeEncryptContents !== decryptedContents) {
        throw new Error("Desencriptación fallida");
    } else if(beforeEncryptContents === beforeDecryptContents) {
        throw new Error("Encriptación fallida");
    }
    Criptador.encryptFiles(__dirname + "/morefiles", pwd, ".txt$", true);
    if(fs.readFileSync(__dirname + "/morefiles/folder1/file1.txt").toString() === "123456") {
        throw new Error("Encriptación recursiva fallida [1]");
    }
    if(fs.readFileSync(__dirname + "/morefiles/folder1/file3.txto").toString() !== "123456") {
        throw new Error("Encriptación recursiva fallida [2]");
    }
    Criptador.decryptFiles(__dirname + "/morefiles", pwd, ".txt$", false);
    if(fs.readFileSync(__dirname + "/morefiles/folder1/file1.txt").toString() !== "123456") {
        throw new Error("Encriptación recursiva fallida [3]");
    }
    if(fs.readFileSync(__dirname + "/morefiles/folder1/file3.txto").toString() !== "123456") {
        throw new Error("Encriptación recursiva fallida [4]");
    }
    return "Tests pasados satisfactoriamente!";
};

return main().then(console.log).catch(console.error);
