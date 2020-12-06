
// TODO: give worker an id name
export function runWorker(path, cb) {
    const worker = new Worker(path);
    worker.on('exit', (exitCode) => {
        if (exitCode === 0) {
            return null;
        }
        return cb(new Error(`Worker has stopped with code ${exitCode}`));
    });
    worker.on('error', () => console.log('Worker encountered an error'));
    worker.on('online', () => console.log('Worker is online'));
    worker.on('message', cb);
    return worker;
}
