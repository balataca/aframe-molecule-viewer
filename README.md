# AR Molecule Viewer

This is a project that renders molecules in .pdb format for AR visualization. It also works on desktop thanks to AFRAME.

## Demo
https://molecule-viewer.glitch.me/

## Requirements for VR/AR

For VR:
* [Google VR Services](https://play.google.com/store/apps/details?id=com.google.vr.vrcore)
* HTTPS support on the server.

For AR:
* [Google Play Services for AR](https://play.google.com/store/apps/details?id=com.google.ar.core)
* Google Chrome > 79
* HTTPS support on the server.

## Installation

Install dependencies:
```
npm install
```

## Usage
Start the server:
```
npm start
```
Open a browser and go to `https://localhost:8080`

* For entering AR mode on a smartphone your server must have `https` enabled.
