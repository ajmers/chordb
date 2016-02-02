export class Song {
    constructor(options) {
        this.update.call(this, options);
    }

    update = properties => {
        Object.keys(properties).map(property => {
            this[property] = properties[property].toLowerCase();
        });
        return this;
    };
}
