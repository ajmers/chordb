const defaultNumStrings = {
    mandolin: 4,
    guitar: 6,
    banjo: 5,
};

const defaultTunings = {
    mandolin: ['G', 'D', 'A', 'E'],
    guitar: ['E', 'A', 'D', 'G', 'B', 'E'],
    banjo: ['G', 'D', 'G', 'B', 'D'],
};

function setInstrumentDefaultNumStrings(numStrings) {
    this.numStrings = numStrings || defaultNumStrings[this.instrument];
}

function setDefaultFingerings(fingerings) {
    if (fingerings) {
        this.fingerings = fingerings;
    } else {
        this.fingerings = defaultTunings[this.instrument].map(string => {
            return { string: string, fret: 0 };
        });
    }
}

export class Chord {
    constructor(options) {
        const { instrument, fingerings, type, numStrings, tuning } = options;
        this.instrument = instrument;
        this.tuning = tuning || '';
        this.type = type;

        setInstrumentDefaultNumStrings(numStrings);
        setDefaultFingerings(fingerings);
    }
}
