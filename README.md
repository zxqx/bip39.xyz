# bip39.xyz

Generate a [mnemonic phrase](https://en.bitcoinwiki.org/wiki/Mnemonic_phrase) for your wallet from an audio recording.

## Features

* Uses [BIP39](https://github.com/coinkite/bip39) JS implementation
* Displays mnemonic phrase strength indicator
* Supports offline usage
* Supports manual source code compilation
* Works with mobile browsers

## Development

### Requirements

- [Node](https://nodejs.org/en/) >=14.0.0
- [Yarn](https://yarnpkg.com/) ^1.22.0

### Setup

Clone the repo:

```sh
$ git clone git@github.com:zxqx/bip39.xyz.git
```

Install dependencies:

```sh
$ yarn
```

### Commands

Run the app in development mode:

```sh
$ yarn start
```

Generate a browser-ready build artifact:

```sh
$ yarn build
```

Generate a ZIP archive of the build artifact:

```sh
$ yarn archive
```
