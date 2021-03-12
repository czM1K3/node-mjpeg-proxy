#!/usr/bin/env node

const MjpegProxy = require('./mjpeg-proxy').MjpegProxy;
const express = require('express');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json'));

const app = express();

config.cams.map(x => {
    app.get('/' + x.name, new MjpegProxy(x.address).proxyRequest);
    console.log("Adding camera: " + x.name);
});

app.listen(config.port);

console.log("Listening on port " + config.port);