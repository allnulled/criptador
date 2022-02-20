#!/usr/bin/env node

const Criptador = require(__dirname + "/../src/index.js");
const Check = require("@allnulled/check-that");
const yargs = require("yargs").argv;

try {
    const { command, directory, filepattern, key } = yargs;
    Check.that(command, "argument: --command", "Required argument --command to be: encrypt or decrypt").isString().hasLengthGreaterThan(0);
    Check.that(directory, "argument: --directory", "Required argument --directory").isString().hasLengthGreaterThan(0);
    Check.that(filepattern, "argument: --filepattern", "Required argument --filepattern").isString().hasLengthGreaterThan(0);
    Check.that(key, "argument: --key", "Required argument --key").isString().hasLengthGreaterThan(0);
    if(command === "encrypt") {
        Criptador.encryptFiles(directory, key, filepattern);
        console.log("OK: Files encrypted successfully.");
    } else if(command === "decrypt") {
        Criptador.decryptFiles(directory, key, filepattern);
        console.log("OK: Files decrypted successfully.");
    } else {
        throw new Error("Unknown command «" + command + "»");
    }
} catch (error) {
    console.error(error);
    console.log("Run «criptador --comand help» to see the manual.");
}