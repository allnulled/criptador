const Criptador = require(__dirname + "/../src/index.js");
const pwd = "Hola que tal";
const texto1 = "Érase una vez, un pepito grillo";

const main = async function() {
    const textoEncriptado = Criptador.encrypt(texto1, pwd);
    const textoDesencriptado = Criptador.decrypt(textoEncriptado, pwd);
    if(texto1 !== textoDesencriptado) {
        throw new Error("Texto encriptado y desencriptado difieren:" + textoEncriptado + "\n" + textoDesencriptado);
    }
    const beforeEncryptContents = require("fs").readFileSync(__dirname + "/files/source-1.js").toString();
    Criptador.encryptFiles(__dirname + "/files", pwd);
    const beforeDecryptContents = require("fs").readFileSync(__dirname + "/files/source-1.js").toString();
    Criptador.decryptFiles(__dirname + "/files", pwd);
    const decryptedContents = require("fs").readFileSync(__dirname + "/files/source-1.js").toString();
    if(beforeEncryptContents !== decryptedContents) {
        throw new Error("Desencriptación fallida");
    } else if(beforeEncryptContents === beforeDecryptContents) {
        throw new Error("Encriptación fallida");
    }
    return "Tests pasados satisfactoriamente!";
};

return main().then(console.log).catch(console.error);
