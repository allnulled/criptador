# criptador

Encrypt and decrypt text or files massively, simply and effortlessly. For both, node.js and browser.

## Installation

`$ npm i -d criptador`

## Usage

### From CLI

```sh
$ criptador --command encrypt --key "some specific key" --directory . --filepattern '\\.js$'
```

### From API

```js
const Criptador = require("criptador");

// For text:
const encrypted = Criptador.encrypt("Text to encrypt", "key to use"); // >> weird characters...
const decrypted = Criptador.decrypt(encrypted, "key to use"); // >> "Text to encrypt"

// For files:
Criptador.encryptFiles(__dirname + "/src", "key to use", "\\.js$");
Criptador.decryptFiles(__dirname + "/src", "key to use", "\\.js$");
```

## Notes

All the API is synchronous, so it is not though for production environments.

## License

No license. Free.