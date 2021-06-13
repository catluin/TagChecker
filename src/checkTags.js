function findTags(input) {
    const tagRegexp = /<\/?[A-Z]>/g;
    return input.match(tagRegexp) || [];
}

function checkTagsErrors(tags) {
    const stack = [null];
    let result = null;

    tags.every(tag => {
        if (!tag.includes('/')) {
            stack.push(tag);
            const expectedTag = tag.replace('<', '</');
            stack.push(expectedTag);
            return true;
        }
        const previousExpectedTag = stack.pop();
        if (previousExpectedTag === tag) {
            stack.pop(); //remove opening tag
            return true;
        }

        result = { expected: previousExpectedTag, found: tag };
        return false;
    });

    if (!result && stack.length > 1) {
        const lastTag = stack.pop();
        result = { expected: lastTag, found: null };
    }
    return result;
};

module.exports = { findTags, checkTagsErrors };