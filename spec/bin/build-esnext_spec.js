import {childProcess} from 'node-promise-es6';

describe('build-esnext', () => {
  it('outputs "3...2...1...Hello World!"', async () => {
    const {stdout} = await childProcess.exec('build-esnext');
    expect(stdout.trim()).toBe('3...2...1...Hello World!');
  });
});
