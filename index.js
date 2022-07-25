
"use strict";
const process = require('node:process');

process.stdin.resume();

const { SerialPort } = require('serialport')
const Readline = require('@serialport/parser-readline'); // ONLY Works on Windows!
let myPort = new SerialPort({
  path: "COM5",
  baudRate: 9600
});
// let myPort = new SerialPort("/dev/cu.usbmodem14101", 9600);
const parser = myPort.pipe(new Readline({ delimiter: '\n' }));  // ONLY Works on Windows!
var express = require('express'), app = express(), port = 8000;

/**
 * DECODE Code
 * 
 * E = Event                                            [0]
 * A-Z = Event Name (ID)                                [1]
 * 1-999 = MS Speed                                     [3], [4], [5]
 * # Loop 1-99                                          [6], [7]
 */

app.post('/effect/:effect', function (req, res) {
  console.log("GOT: "+req.params.effect);
  myPort.write(req.params.effect+"\n", ()=>{
    myPort.drain();
  });
  res.status(200).send("EFFEKT DONE.");
});
app.post('/color/:effect', function (req, res) {
  console.log("GOT: "+req.params.effect);
  myPort.write(req.params.effect+"\n", ()=>{
    myPort.drain();
  });
  res.status(200).send("COLOR DONE.");
});

parser.on('data', data =>{  // ONLY Works on Windows!
  console.log('[ CONSOLE ] ', data);
});

app.listen(port, function () {
 console.log('Listening on port ' + port);
});

process.on('SIGINT', ()=>{
  console.clear();
  console.log("\r\nshutting down ...");
  myPort.close(()=>{
    console.clear();
    console.log("\r\nshutting down ... done.");
    process.exit();
  });
})