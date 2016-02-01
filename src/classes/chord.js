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

const numericalWhitelist = ['minFret'];
const unmodifiedStringWhitelist = ['name'];
const stringWhitelist = ['instrument', 'tonic', 'type', 'tuning'];
const affectsFingerings = ['fingerings', 'instrument'];

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
    if (!this.name) {
        this.name = `${this.tonic || ''} ${this.type || ''}` || '';
    }
}

export class Chord {
    constructor(options) {
        const { numStrings, fingerings } = options;
        this.update.call(this, options);

        setInstrumentDefaultNumStrings.apply(this, numStrings);
        setDefaultFingerings.apply(this, fingerings);
    }

    update = properties => {
        let resetFingerings = false;
        Object.keys(properties).map(property => {
            if (affectsFingerings.indexOf(property) > -1) {
                resetFingerings = true;
            }
            if (numericalWhitelist.indexOf(property) > -1) {
                this[property] = parseInt(properties[property]);
            } else if (unmodifiedStringWhitelist.indexOf(property) > -1) {
                this[property] = properties[property];
            } else if (stringWhitelist.indexOf(property) > -1) {
                this[property] = properties[property].toLowerCase();
            }
        });
        updateChordName.apply(this);
        if (resetFingerings) {
            setInstrumentDefaultNumStrings.apply(this);
            setDefaultFingerings.apply(this);
        }
        return this;
    };

    setStringFingering = (stringIndex, fret) => {
        const { string } = this.fingerings[stringIndex];
        const newString = { string, fret };
        this.fingerings.splice(stringIndex, 1, newString);
        return this;
    };
}
