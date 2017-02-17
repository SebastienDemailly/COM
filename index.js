var SerialPort = require('serialport');;
var sp = new SerialPort("COM1", {
    parser: SerialPort.parsers.readline("\n"),
    baudrate: 9600
});

var SerialPort = require('serialport');
SerialPort.list(function(err, ports) {
    ports.forEach(function(port) {
        console.log(port.comName);
        console.log(port.pnpId);
        console.log(port.manufacturer);
    });
});

sp.on("open", function() {
    var poidsActuel = "";
    var poidsPrecedent = "";
    sp.on('data', function(data) {
        if (data.search("Kg") != -1) {
            poidsActuel = data.slice(6, 14);
            if (poidsActuel != poidsPrecedent) {
                console.log(poidsActuel + ' Kg');
                poidsPrecedent = poidsActuel;
            }
        }
    });
});

sp.on('error', function(err) {
    console.log('Error: ', err.message);
})
