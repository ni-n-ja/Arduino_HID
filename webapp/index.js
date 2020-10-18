'use strict';

const comPort = 'COM6';

const SerialPort = require('serialport');
const parsers = SerialPort.parsers;
const parser = new parsers.Readline({
    delimiter: '\r\n'
});
const port = new SerialPort(comPort, {
    baudRate: 9600,
    parity: 'none',
    dataBits: 8,
    stopBits: 1,
});
port.pipe(parser);

const errHandler = (err) => {
    if (err) {
        console.log('Error on write: ', err.message);
    }
}

port.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message)
    }
    port.write('main screen turn on')
})

// 参考
// https://github.com/arduino-libraries/Keyboard/tree/master/src

port.on('open', () => {
    console.log('Open ' + comPort);
});

parser.on('data', (data) => {
    console.log(data.toString());
});

const express = require('express')
const app = express()

let isRunning = false;

const sendData = () => {
    setTimeout(() => {
        console.log(Math.random());
        port.write("\x01", errHandler);
        port.write("e", errHandler);
        port.write("\x02", errHandler);
        port.write("e", errHandler);
        if (isRunning) {
            sendData();
        }
    }, 100);
}

app.get('/api/status', (req, res) => {
    if (isRunning) {
        isRunning = false;
        res.send('red');
    } else {
        isRunning = true;
        sendData();
        res.send('green');
    }

})

app.use('/', express.static(__dirname));

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:${3000}`)
})