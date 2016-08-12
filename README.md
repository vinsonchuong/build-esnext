# build-esnext
[![Build Status](https://travis-ci.org/vinsonchuong/build-esnext.svg?branch=master)](https://travis-ci.org/vinsonchuong/build-esnext)

Compile and concatenate ES.next modules

## Installing
`build-esnext` is available as an
[npm package](https://www.npmjs.com/package/build-esnext).

## Usage
Add `build-bin` and `build-esnext` to the `package.json`.

```json
{
  "name": "project",
  "private": true,
  "scripts": {
    "build": "build"
  },
  "devDependencies": {
    "build-bin": "^0.0.2",
    "build-esnext": "^0.0.1"
  }
}
```

From the command line, run:
```bash
npm run build
```

`build-esnext` assumes an entry point at `src/index.js` and will compile it and
its dependencies into `dist/dist.js`.

## Development
### Getting Started
The application requires the following external dependencies:
* Node.js

The rest of the dependencies are handled through:
```bash
npm install
```

Run tests with:
```bash
npm test
```
