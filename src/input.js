function readValue(lineProcessingFunction) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Enter the paragraph to check ("exit" to terminate):\n'
    });

    readline.prompt();

    readline.on('line', line => {
        if (line.toLowerCase() === "exit") {
            process.exit(0);
        }
        lineProcessingFunction(line);
        readline.prompt();
    }).on('close', () => {
        process.exit(0);
    });
}

module.exports = { readValue }