const concat = require('concat-stream');
const spawn = require('child_process').spawn;

function execute(processPath, input) {
    const childProcess = spawn('node', [processPath], { env: { NODE_ENV: 'test' } });;
    childProcess.stdin.setEncoding('utf-8');

    childProcess.stdin.write(input + '\n');
    childProcess.stdin.write('exit\n');

    const promise = new Promise((resolve, reject) => {
        childProcess.stderr.once('data', err => {
            reject(err.toString());
        });
        childProcess.on('error', reject);
        childProcess.stdout.pipe(
            concat(result => {
                resolve(result.toString());
            })
        );
    });
    return promise;
}
module.exports = { execute };