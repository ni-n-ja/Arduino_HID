'use strict';

const comPort = 'COM5';

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

port.on('open', () => {
    console.log('Open ' + comPort);
    setInterval(() => {
        console.log(Math.random());
        port.write("\x01", errHandler);
        port.write("a", errHandler);
        port.write("\x02", errHandler);
        port.write("a", errHandler);
    }, 1000);
});

parser.on('data', (data) => {
    console.log(data.toString());
});
