//Importing onoff Module
const Gpio = require('onoff').Gpio;


//Setting Pin Numbers (gpio numbering)
const pinNums = [18, 23, 24, 25];


//Initializing GPIO Pins
const pin1 = new Gpio(pinNums[0], 'out');
const pin2 = new Gpio(pinNums[1], 'out');
const pin3 = new Gpio(pinNums[2], 'out');
const pin4 = new Gpio(pinNums[3], 'out');


//Setting pins low
pin1.writeSync(0);
pin2.writeSync(0);
pin3.writeSync(0);
pin4.writeSync(0);


//Single Phase
const singlePhase = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
];

const singlePhaseBackwards = [
    [0, 0, 0, 1],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [1, 0, 0, 0]
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

//Delay Function
const delay = (ms) => {
    const startPoint = new Date().getTime()
    while (new Date().getTime() - startPoint <= ms) {/* wait */}
}

//Functions to Drive the Stepper Motor
const single = (revs = 1) => {
    for(i = 0; i < revs; i++) {
        singlePhase.forEach((pinValues) => {
            pin1.writeSync(pinValues[0]);
            pin2.writeSync(pinValues[1]);
            pin3.writeSync(pinValues[2]);
            pin4.writeSync(pinValues[3]);
            delay(1);
        });
    }
}

const singleBackwards = (revs = 1) => {
    for(i = 0; i < revs; i++) {
        singlePhaseBackwards.forEach((pinValues) => {
            pin1.writeSync(pinValues[0]);
            pin2.writeSync(pinValues[1]);
            pin3.writeSync(pinValues[2]);
            pin4.writeSync(pinValues[3]);
            delay(1);
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
            delay(1);
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
            delay(0.5);
        });
    }
}

//One Revolution Each
console.log('Single Phase...');
single(512);

delay(1000);

console.log('Single Phase Backwards...');
singleBackwards(512);

delay(1000);

console.log('Full Stepping / Dual Phase...');
full(512);

delay(1000);

console.log('Half Stepping...');
half(512);

delay(1000);

//Unexporting Pins
pin1.unexport();
pin2.unexport();
pin3.unexport();
pin4.unexport();