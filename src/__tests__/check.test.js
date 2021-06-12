const checker = require('../check.js');

describe('check.js', () => {
    describe('should return an array of tags', () => {
        it('no tags', () => {
            expect(checker.findTags('')).toEqual([]);
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

    describe('constructing stack', () => {
        it('correct tags', () => {
            expect(checker.checkTagsErrors(['<C>', '<B>', '</B>', '</C>'])).toEqual('Correctly tagged paragraph');
        });

        it('mixed tags', () => {
            expect(checker.checkTagsErrors(['<C>', '</B>', '</C>', '</B>'])).toEqual('Expected </C> found </B>');
        });

        it('extra closing tag', () => {
            expect(checker.checkTagsErrors(['<B>', '</B>', '</C>'])).toEqual('Expected # found </C>');
        });

        it('missing closing tag', () => {
            expect(checker.checkTagsErrors(['<B>', '<C>', '</C>'])).toEqual('Expected </B> found #');
        });
    });
});