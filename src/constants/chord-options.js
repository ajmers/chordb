export const flatSign = String.fromCharCode(0x266d);
export const sharpSign = String.fromCharCode(0x266f);

export const instrumentOptions = {
    name: 'instrument',
    options: [
        { value: 'guitar', label: 'Guitar' },
        { value: 'mandolin', label: 'Mandolin' },
    ],
};

export const typeOptions = {
    name: 'type',
    options: [
        { value: 'major', label: 'Major' },
        { value: 'minor', label: 'Minor' },
        { value: 'diminished', label: 'Diminished' },
        { value: 'augmented', label: 'Augmented' },
        { value: '7', label: '7' },
        { value: '6', label: '6' },
    ],
};

export const tonicOptions = {
    name: 'tonic',
    options: [
        { value: 'c', label: 'C' },
        { value: 'c#', label: 'C' + sharpSign },
        { value: 'db', label: 'D' + flatSign },
        { value: 'd', label: 'D' },
        { value: 'd#', label: 'D' + sharpSign },
        { value: 'eb', label: 'E' + flatSign },
        { value: 'e', label: 'E' },
        { value: 'f', label: 'F' },
        { value: 'f#', label: 'F' + sharpSign },
        { value: 'g', label: 'G' },
        { value: 'g#', label: 'G' + sharpSign },
        { value: 'ab', label: 'A' + flatSign },
        { value: 'a', label: 'A' },
        { value: 'bb', label: 'B' + flatSign },
        { value: 'b', label: 'B' },
    ],
};
