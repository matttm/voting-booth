
export class P2pServer {
    constructor() {
        this.sockets = [];
    }

    /**
     * Set properties of the server
     * @param property the property to give the server
     * @param value the value of the property
     */
    set(property, value) {
        this[property] = value;
    }
}