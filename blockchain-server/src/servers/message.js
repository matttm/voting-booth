/**
 * Message Types for a Message
 * @type {{CHAIN: string, ADD_BLOCK: string, ADD_PEER: string}}
 */
export const MessageType = {
    // when a block is sent
    ADD_BLOCK: 'ADD_BLOCK',
    // when entire chain is sent
    // TODo: change this to REPLACE_CHAIN
    CHAIN: 'CHAIN',
    // request chain due to invalidity
    REQUEST_CHAIN: 'REQUEST_CHAIN',
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
