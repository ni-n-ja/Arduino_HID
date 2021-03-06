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
    " ".split("").forEach((ch, i) => {
        setTimeout(() => {
            port.write("\x01", errHandler);
            port.write(ch, errHandler);
            port.write("\x02", errHandler);
            port.write(ch, errHandler);
        }, 500 * i);
    });
    // let key = new Buffer(1);
    // key.fill(0xB0);
    // port.write("\x01", errHandler);
    // port.write(key, errHandler);
    // port.write("\x02", errHandler);
    // port.write(key, errHandler);
});

parser.on('data', (data) => {
    console.log(data.toString());
});
