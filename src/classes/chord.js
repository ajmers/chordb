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

let nameSet = false;

function setInstrumentDefaultNumStrings(numStrings) {
    this.numStrings = numStrings || defaultNumStrings[this.instrument];
}

function setDefaultFingerings(fingerings) {
    if (fingerings) {
        this.fingerings = fingerings;
    } else {
        this.fingerings = defaultTunings[this.instrument] &&
            defaultTunings[this.instrument].map(string => {
                return { string: string, fret: 0 };
            });
    }
}

function updateChordName() {
    if (!this.name || !nameSet) {
        this.name = `${this.tonic || ''} ${this.type}` || '';
    }
}

export class Chord {
    constructor(options) {
        const { instrument, fingerings, type, numStrings, tuning } = options;
        this.instrument = instrument.toLowerCase();
        this.tuning = tuning || '';
        this.type = type || '';

        setInstrumentDefaultNumStrings.apply(this, numStrings);
        setDefaultFingerings.apply(this, fingerings);
    }

    update = properties => {
        Object.keys(properties).map(property => {
            this[property] = properties[property].toLowerCase();
            if (property === 'name') nameSet = true;
        });
        updateChordName.apply(this);
        setInstrumentDefaultNumStrings.apply(this);
        setDefaultFingerings.apply(this);
        return this;
    };
}
