//Importing onoff Module
const Gpio = require('onoff').Gpio;


//Setting Pin Numbers (gpio numbering)

const pinNums = [18, 23, 24, 25];


//Initializing GPIO Pins

const pin1 = new Gpio(pinNums[0], 'out');
const pin2 = new Gpio(pinNums[1], 'out');
const pin3 = new Gpio(pinNums[2], 'out');
const pin4 = new Gpio(pinNums[3], 'out');


//Single Phase

const singlePhase = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];


//Full Stepping

const dualPhase = [
    [1, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 1]
];


//Half Stepping

const halfStep = [
    [1, 0, 0, 0],
    [1, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 1],
    [1, 0, 0, 1]
];

//Functions to Drive the Stepper Motor
const single = (revs = 1) => {
    for(i = 0; i < revs; i++) {
        singlePhase.forEach((pinValues) => {
            pin1.write(pinValues[0]);
            pin2.write(pinValues[1]);
            pin3.write(pinValues[2]);
            pin4.write(pinValues[3]);
            setTimeout(() => {
                
            }, 1000);           
        });
    }
}

const full = (revs = 1) => {
    for(i = 0; i < revs; i++) {
        dualPhase.forEach((pinValues) => {
            pin1.write(pinValues[0]);
            pin2.write(pinValues[1]);
            pin3.write(pinValues[2]);
            pin4.write(pinValues[3]);
        });
    }
}

const half = (revs = 1) => {
    for(i = 0; i < revs; i++) {
        halfStep.forEach((pinValues) => {
            pin1.write(pinValues[0]);
            pin2.write(pinValues[1]);
            pin3.write(pinValues[2]);
            pin4.write(pinValues[3]);
        });
    }
}

console.log('Single Phase...');
single(15);

/*
console.log('Full Stepping / Dual Phase...');
full(5);

console.log('Half Stepping...');
half(5);
*/