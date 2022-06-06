
"use strict";
const process = require('node:process');
// let SerialPort = require('serialport');
// let myPort = new SerialPort("/dev/cu.usbmodem14101", 9600);

process.stdin.resume();

const { SerialPort } = require('serialport')
let myPort = new SerialPort({
  path: "/dev/cu.usbmodem14101",
  baudRate: 4800
});
var express = require('express'),
  app = express(),
  port = 8000;

// var five = require("johnny-five"),
//   board = new five.Board(),
//   led = null,
//   

// board.on("ready", function() {
//   console.log("### Board ready!");
//   led = new five.Led(13);
// });

app.get('/led/:mode', function (req, res) {
  myPort.write("E1", ()=>{
    myPort.drain();
  });
  res.status(200).send("OK")
});

app.listen(port, function () {
 console.log('Listening on port ' + port);
});

process.on('SIGTERM', ()=>{
  console.info("Shutdown forced.");
  // myPort.close();
})

process.on('SIGINT', ()=>{
  console.info("Shutdown forced.");
  myPort.close(()=>{
    process.kill()
  });
})