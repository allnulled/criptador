# criptador

Encrypt and decrypt text or files massively, simply and effortlessly. For both, node.js and browser.

## Installation

`$ npm i -d criptador`

## Usage

### From CLI

```sh
$ criptador
    # Required:
    --command encrypt # or decrypt
    --password "some specific key"
    --file . # you can sppecify a directory
    --file file1.txt # ...or multiple files
    --file file2.txt # ...all at once
    # Optional:
    --filepattern '\\.js$' # Regex for files to match
    --verbose # Will list the transformed files
```

### From API

```js
const Criptador = require("criptador");

// For text:
const encrypted = Criptador.encrypt("Text to encrypt", "key to use"); // ...returns: weird characters...
const decrypted = Criptador.decrypt(encrypted, "key to use"); // ...returns: "Text to encrypt"

// For files:
Criptador.encryptFiles(__dirname + "/src", "key to use", "\\.js$");
Criptador.decryptFiles(__dirname + "/src", "key to use", "\\.js$");
Criptador.encryptFiles(__dirname + "/src/file1.txt", "key to use", "\\.js$");
Criptador.encryptFiles(__dirname + "/src/file2.txt", "key to use", "\\.js$");
Criptador.encryptFiles(__dirname + "/src/file3.txt", "key to use", "\\.js$");
Criptador.encryptFiles(__dirname + "/src/file3.txt", "key to use", "\\.js$", !!"isVerbose");
```

## Notes

All the API is synchronous, so it is not though for production environments.

## License

No license. Free.