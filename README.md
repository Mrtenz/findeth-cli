# findeth-cli

`findeth-cli` is a simple command line tool to search for ("bruteforce") addresses with a mnemonic phrase.

## Getting started

* Install the tool with NPM or Yarn:

  ```
  $ npm install -g findeth-cli
  ```

  or

  ```
  $ yarn global add findeth-cli
  ```

* Run it with `findeth`:

  ```
  $ findeth --help
  ```

## CLI

```
Usage: lib [options]

Options:
  --start <path>             path to start at
  --address <address>        address to search for
  --mnemonic <mnemonic>      mnemonic phrase
  --depth <number>           maximum search depth
  --passphrase [passphrase]  optional passphrase for the mnemonic phrase
  -h, --help                 output usage information
```


### Examples

#### Basic search

```
findeth --start "m/44'/0'/0'/0/0" --address "0xe3C180D984a79BEA0E6c16D6721E760d7dE97714" --mnemonic "planet swallow mouse avoid current pottery mother cube divert risk sand desert" --depth 100
```

#### Shorter derivation path

The tool can search for (technically invalid) shorter derivation paths:

```
findeth --start "m/44'/0'/0'/0" [other options...]
```

#### Start from specific path

It's possible to start from a specific point, for example to continue searching.

```
findeth --start "m/44'/123'/456'/789/0" [other options...]
```
