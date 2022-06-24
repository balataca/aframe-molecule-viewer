# Molecule Viewer

This is a project that renders molecules in .pdb format for AR visualization. It also works on desktop thanks to AFRAME.

## Requirements for VR/AR

For VR:
* [Google VR Services](https://play.google.com/store/apps/details?id=com.google.vr.vrcore)
* HTTPS support on the server.

For AR:
* [Google Play Services for AR](https://play.google.com/store/apps/details?id=com.google.ar.core)
* Google Chrome > 79
* HTTPS support on the server.

## Installation
You just need to serve this folder.

You can use the [serve](https://www.npmjs.com/package/serve) library for this:
```
npm install -g serve
```

For `https` support use the [https-localhost](https://www.npmjs.com/package/https-localhost) library:
```
npm install -g https-localhost
```


## Usage
Start the server:
```
serve
```

For entering AR mode on a smartphone your server must have `https` enabled.