try {
    let Criptador, CriptadorUtils;
} catch(error) {}

CriptadorUtils = class {

    static readFileSync(file) {
        if(typeof file !== "string") {
            throw new Error("Required «file» to be a string");
        }
        return require("fs").readFileSync(file).toString();
    }

    static writeFileSync(file, contents) {
        if(typeof file !== "string") {
            throw new Error("Required «file» to be a string");
        }
        if(typeof contents !== "string") {
            throw new Error("Required «contents» to be a string");
        }
        return require("fs").writeFileSync(file, contents, "utf8");
    }

    static readdirRecursively(dir) {
        if(typeof dir !== "string") {
            throw new Error("Required «dir» to be a string");
        }
        const fs = require("fs");
        const path = require("path");
        let files = [];
        let subnodes = fs.readdirSync(dir).map(f => path.resolve(dir, f));
        for (let indexSubnode = 0; indexSubnode < subnodes.length; indexSubnode++) {
            const subnode = subnodes[indexSubnode];
            if (fs.lstatSync(subnode).isDirectory() && !subnode.endsWith("/node_modules")) {
                files = files.concat(CriptadorUtils.readdirRecursively(subnode));
            } else if(fs.lstatSync(subnode).isFile()) {
                files.push(subnode);
            }
        }
        return files;
    }

    static translateCharacterByKeyAndPosition(ch, key, pos) {
        if(typeof ch !== "string") {
            throw new Error("Required «ch» to be a string");
        }
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        if(typeof pos !== "number") {
            throw new Error("Required «pos» to be a string");
        }
        return String.fromCharCode(ch.charCodeAt(0) + key.charCodeAt(pos % key.length));
    }

    static reverseCharacterByKeyAndPosition(ch, key, pos) {
        if(typeof ch !== "string") {
            throw new Error("Required «ch» to be a string");
        }
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        if(typeof pos !== "number") {
            throw new Error("Required «pos» to be a string");
        }
        return String.fromCharCode(ch.charCodeAt(0) - key.charCodeAt(pos % key.length));
    }

    static translateKeyIntoAlgorythm(key) {
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        return function (text) {
            if(typeof text !== "string") {
                throw new Error("Required «text» to be a string");
            }
            let output = "";
            for (let index = 0; index < text.length; index++) {
                let ch = text[index];
                output += CriptadorUtils.translateCharacterByKeyAndPosition(ch, key, index);
            }
            return output;
        };
    }

    static translateKeyIntoReverseAlgorythm(key) {
        if(typeof key !== "string") {
            throw new Error("Required «key» to be a string");
        }
        return function (text) {
            if(typeof text !== "string") {
                throw new Error("Required «text» to be a string");
            }
            let output = "";
            for (let index = 0; index < text.length; index++) {
                let ch = text[index];
                output += CriptadorUtils.reverseCharacterByKeyAndPosition(ch, key, index);
            }
            return output;
        };
    }

    static overridingFile(file, fileContentsFinal, isEncryption, isVerbose, index, total) {
        try {
            if(isVerbose) {
                console.log(`OK: [${index}/${total}] ` + (isEncryption ? "Encrypting" : "Decrypting") + " file: " + file);
            }
            CriptadorUtils.writeFileSync(file, fileContentsFinal);
        } catch (error) {
            console.error("[!] Error while " + (isEncryption ? "encrypting" : "decrypting") + " file: " + file);
            console.error("Error details: ", error);
        }
    }

    static xcryptFiles(basedir, filePattern, password, isEncryption = true, isVerbose = false) {
        if(Array.isArray(basedir)) {
            for(let index = 0; index < basedir.length; index++) {
                const itemdir = basedir[index];
                this.xcryptFiles(itemdir, filePattern, password, isEncryption, isVerbose);
            }
            return;
        }
        const fs = require("fs");
        if(typeof basedir !== "string") {
            throw new Error("Required «basedir» to be a string");
        }
        if(typeof filePattern !== "string") {
            throw new Error("Required «filePattern» to be a string");
        }
        if(typeof password !== "string") {
            throw new Error("Required «password» to be a string");
        }
        if(typeof isEncryption !== "boolean") {
            throw new Error("Required «isEncryption» to be a boolean");
        }
        if(!fs.existsSync(basedir)) {
            throw new Error("Required file or directory «"+ basedir + "» to exist");
        }
        if(fs.lstatSync(basedir).isDirectory()) {
            const filePatternRegex = new RegExp(filePattern, "g");
            const filesMatched = CriptadorUtils.readdirRecursively(basedir).filter(f => f.match(filePatternRegex));
            if(isVerbose) {
                console.log("OK: Matched " + filesMatched.length + " files to encrypt.");
            }
            for(let index = 0; index < filesMatched.length; index++) {
                const file = filesMatched[index];
                if(fs.lstatSync(file).isFile()) {

                }
                const fileContents = CriptadorUtils.readFileSync(file);
                const fileContentsFinal = isEncryption 
                ? CriptadorUtils.translateKeyIntoAlgorythm(password)(fileContents)
                : CriptadorUtils.translateKeyIntoReverseAlgorythm(password)(fileContents);
                CriptadorUtils.overridingFile(file, fileContentsFinal, isEncryption, isVerbose, index+1, filesMatched.length);
            }
        } else {
            const fileContents = CriptadorUtils.readFileSync(basedir);
            const fileContentsFinal = isEncryption 
            ? CriptadorUtils.translateKeyIntoAlgorythm(password)(fileContents)
            : CriptadorUtils.translateKeyIntoReverseAlgorythm(password)(fileContents);
            CriptadorUtils.overridingFile(basedir, fileContentsFinal, isEncryption, isVerbose, 1, 1);
        }
    }

}

Criptador = class {

    static get utils() {
        return CriptadorUtils;
    }

    static encryptFiles(basedir, key, filePattern = ".*", isVerbose = false) {
        return CriptadorUtils.xcryptFiles(basedir, filePattern, key, true, isVerbose);
    }

    static decryptFiles(basedir, key, filePattern = ".*", isVerbose = false) {
        return CriptadorUtils.xcryptFiles(basedir, filePattern, key, false, isVerbose);
    }

    static encrypt(text, key) {
        return CriptadorUtils.translateKeyIntoAlgorythm(key)(text);
    }

    static decrypt(text, key) {
        return CriptadorUtils.translateKeyIntoReverseAlgorythm(key)(text);
    }

}

if (typeof window !== "undefined") {
    window.Criptador = Criptador;
}

if (typeof global !== "undefined") {
    global.Criptador = Criptador;
}

if (typeof module !== "undefined") {
    module.exports = Criptador;
}

