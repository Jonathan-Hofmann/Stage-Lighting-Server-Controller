
"use strict";
const process = require('node:process');
// let SerialPort = require('serialport');
// let myPort = new SerialPort("/dev/cu.usbmodem14101", 9600);

process.stdin.resume();

const { SerialPort } = require('serialport')
let myPort = new SerialPort({
  path: "/dev/cu.usbmodem14301",
  baudRate: 9600
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


/**
 * DECODE Code
 * 
 * E = Event                                            [0]
 * A-Z = Event Name (ID)                                [1]
 * 1-3 = Länge MS Zeit --> 3 = Hunderter = z.B. 100     [2]
 * 1-999 = MS Speed                                     [3], [4], [5]
 */

app.get('/effect/:effect', function (req, res) {
  myPort.write(req.params.effect+"\n", ()=>{
    myPort.on('data', (data) => { 
      console.log(data)
      // resolve(data)
      myPort.drain();
      
    })
    
  });
  res.status(200).send("EFFEKT DONE.");
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