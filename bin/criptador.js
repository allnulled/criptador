#!/usr/bin/env node

const Criptador = require(__dirname + "/../src/index.js");
const Check = require("@allnulled/check-that");
const yargs = require("yargs").argv;

try {
    let { command, file, filepattern = ".*", password, verbose} = yargs;
    const printHelp = function() {
        console.log("#######################################");
        console.log("# This is the only help for criptador #");
        console.log("#######################################");
        console.log("");
        console.log("To use «criptador» simply:");
        console.log("  $ criptador");
        console.log("     # Required parameters:   # ");
        console.log("      --command encrypt      # or decrypt");
        console.log("      --file 1.txt           # files");
        console.log("      --file 2.txt           # more files");
        console.log("      --file myfolder        # folders (recursively)");
        console.log("      --password secret      # ");
        console.log("     # Optional parameters:   # ");
        console.log("      --verbose              # ");
        console.log("");
        console.log("#####################[ by allnulled ]##");
    }
    if(["encrypt", "decrypt"].indexOf(command) === -1) {
        command = "help";
    }
    if(command === "help") {
        printHelp();
        return;
    }
    if(typeof file === "string") {
        file = [file];
    }
    Check.that(file, "argument: --file", "Required argument --file").isArray().hasLengthGreaterThan(0);
    Check.that(password, "argument: --password", "Required argument --password").isString().hasLengthGreaterThan(0);
    if(!filepattern) {
        filepattern = [".*"];
    }
    if(command === "encrypt") {
        Criptador.encryptFiles(file, password, filepattern, verbose);
        console.log("OK: Files encrypted successfully by criptador.");
    } else if(command === "decrypt") {
        Criptador.decryptFiles(file, password, filepattern, verbose);
        console.log("OK: Files decrypted successfully by criptador.");
    } else {
        printHelp();
    }
} catch (error) {
    console.error(error);
    console.log("Run «criptador --comand help» to see the manual.");
}