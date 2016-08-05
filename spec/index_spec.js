import buildEsnext from 'build-esnext';

describe('build-esnext', () => {
  it('prints Hello World!', () => {
    expect(buildEsnext()).toBe('Hello World!');
  });
});
