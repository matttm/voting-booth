import {handle, hasVoted} from "../utilities";
import {addBlock, getBlockchain} from "../services/blockchain-service";
import {parentPort} from 'worker_threads';
import * as nodemailer from 'nodemailer';

let transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 2525,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
const message = {
    from: 'noreply@voting.com', // Sender address
    to: undefined,
    subject: 'Voting Status', // Subject line
    text: undefined
};
const successText = 'Your vote has been successfully submitted.';
const failureText = 'Your vote failed to be submitted. Please try again later';
const attempts = parseInt(process.env.FAILSAFE_ATTEMPTS, 10);

/**
 * File contains code that a child process will execute to
 * act as a failsafe if the blockchain server is temporarily down.
 * The failsafe is, if the blockchain server is unreachable, the vote
 * will be saved and will attempt sending at a later time.
 **/
parentPort.on('message', async (message) => {
    console.log('Worker got a message');
    const user = message.user;
    const vote = message.vote;
    const email = message.email;
    console.log(`message: ${JSON.stringify(message)}`);
    if (!user || !vote) {
        console.log("Fallback service's message was invalid");
        return;
    }
    let attempt = 0;
    const interval = setInterval(async () => {
        console.log('Retrying vote submission');
        if (attempt === attempts) {
            console.log('Attempts reached. Stopping failsafe.');
            clearInterval(interval);
            await mailCallback(transport, email, failureText);
            return;
        }
        let [chain, err] = await handle(getBlockchain());
        if (err) {
            console.log('Fallback service failed to determine whether user has voted');
            console.log(`attempt ${attempt} attempts ${attempts}`);
            attempt++;
            return;
        }
        // if user has already voted, reject
        if (hasVoted(chain, user, 'true')) {
            console.log('Fallback service determined that user already voted');
            clearInterval(interval);
        }
        let status;
        [status, err] = await handle(addBlock(vote));
        if (err) {
            console.log('Fallback service failed to file vote');
            attempt++;
            return;
        }
        if (status) {
            console.log('Fallback service successfully filed vote');
            clearInterval(interval);
            await mailCallback(transport, email, successText);
        }
    }, 10000);
});

/**
 * Send a message with transport
 *
 * @param transport the object doing the sending
 * @param email the email the message is going to
 * @param text the text in the message
 */
async function mailCallback(transport, email, text) {
    const [info, err] =
        await handle(transport.sendMail({...message, to: email, text: text}));
    if (err) {
        console.log(err)
    } else {
        console.log(info);
    }
}
