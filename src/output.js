function printTagCheckResult(result) {
    if (!result) {
        console.log('Correctly tagged paragraph');
        return;
    }
    const expectedTag = result.expected || '#';
    const foundTag = result.found || '#';

    console.log(`Expected ${expectedTag} found ${foundTag}`);
}

module.exports = { printTagCheckResult }