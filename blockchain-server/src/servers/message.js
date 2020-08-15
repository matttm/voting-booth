/**
 * Message Types for a Message
 * @type {{CHAIN: string, ADD_BLOCK: string, ADD_PEER: string}}
 */
export const MessageType = {
    // when a block is sent
    ADD_BLOCK: 'ADD_BLOCK',
    // when etire chain is sent
    CHAIN: 'CHAIN',
    // when a peer is sent
    ADD_PEER: 'ADD_PEER'
};

/**
 * Message to be sent to other nodes
 */
export class Message {
    /**
     * @param type a MessageType
     * @param payload what to be sent
     * @constructor
     */
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }

}
