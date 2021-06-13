const input = require('./input');
const checker = require('./check');
const output = require('./output');

input.readValue(value => {
    var tags = checker.findTags(value);
    var result = checker.checkTagsErrors(tags);
    output.printTagCheckResult(result);
});

