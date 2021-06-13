const cmd = require('./cmd');
const { EOL } = require('os');

describe('TagChecker', () => {
    it('correct paragraph with text', async () => {
        const response = await cmd.execute(
            './src/index',
            'The following text<C><B>is centred and in boldface</B></C>'
        );
        const received = response.trim().split('\n');
        expect(received).toContain('Correctly tagged paragraph');
    });

    it('correct paragraph with tag-looking text', async () => {
        const response = await cmd.execute(
            './src/index',
            '<B>This <\g>is <B>boldface</B> in <<*> a</B> <\0> <<d>sentence'
        );
        const received = response.trim().split('\n');
        expect(received).toContain('Correctly tagged paragraph');
    });

    it('incorrect paragraph with wrong nesting', async () => {
        const response = await cmd.execute(
            './src/index',
            '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>'
        );
        const received = response.trim().split('\n');
        expect(received).toContain('Expected </C> found </B>');
    });

    it('incorrect paragraph with extra closing tag', async () => {
        const response = await cmd.execute(
            './src/index',
            '<B>This should be in boldface, but there is an extra closing tag</B></C>'
        );
        const received = response.trim().split('\n');
        expect(received).toContain('Expected # found </C>');
    });

    it('incorrect paragraph with missing closing tag', async () => {
        const response = await cmd.execute(
            './src/index',
            '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>'
        );
        const received = response.trim().split('\n');
        expect(received).toContain('Expected </B> found #');
    });
});