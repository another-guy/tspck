# tspck

## Dev notes

### Main recompilation command

```sh
npm run clean-compile
```

### Rebuild from scratch and smoke test

```sh
rm -rf ./bin && tsc && node ./bin/tspck.js help && node ./bin/tspck.js help init
```

### Publish package

Make sure to replace program version everywhere, not just in `package.json`.

```sh
rm -rf ./bin && tsc && npm publish
```

### Global package install and test

```sh
npm install -g tspck@1.0.0-alphaX

tspck help && tspck help init
```