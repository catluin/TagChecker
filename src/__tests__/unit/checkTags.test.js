const checker = require('../../checkTags.js');

describe('check.js', () => {
    describe('should return an array of tags', () => {
        it('no tags', () => {
            expect(checker.findTags('no tags')).toEqual([]);
        });

        it('one tag', () => {
            expect(checker.findTags('<A>')).toEqual(['<A>']);
        });

        it('two opening tags', () => {
            expect(checker.findTags('<A>blah<B>')).toEqual(['<A>', '<B>']);
        });

        it('one closing tag', () => {
            expect(checker.findTags('</A>')).toEqual(['</A>']);
        });

        it('two closing tags', () => {
            expect(checker.findTags('</A>blah</B>')).toEqual(['</A>', '</B>']);
        });

        it('opening and closing tags', () => {
            expect(checker.findTags('<A>blah<B>blah</B>blah<a>')).toEqual(['<A>', '<B>', '</B>']);
        });
    });

    describe('should check tag errors', () => {
        it('correct tags', () => {
            expect(checker.checkTagsErrors(['<C>', '<B>', '</B>', '</C>'])).toBeNull();
        });

        it('mixed tags', () => {
            expect(checker.checkTagsErrors(['<C>', '</B>', '</C>', '</B>'])).toEqual({expected: '</C>', found: '</B>'});
        });

        it('extra closing tag', () => {
            expect(checker.checkTagsErrors(['<B>', '</B>', '</C>'])).toEqual({expected: null, found: '</C>'});
        });

        it('missing closing tag', () => {
            expect(checker.checkTagsErrors(['<B>', '<C>', '</C>'])).toEqual({expected: '</B>', found: null});
        });
    });
});