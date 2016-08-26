import register from 'test-inject';
import Directory from 'directory-helpers';

const inject = register({
  project: {
    setUp: () => new Directory('project'),
    tearDown: async (project) => await project.remove()
  }
});

describe('build-esnext', () => {
  it('acts during the compile stage', async () => {
    const directory = new Directory('.');
    const {stage} = await directory.read('package.json');
    expect(stage).toBe('compile');
  });

  it('compiles an ES.next module at src/index.js to dist/index.js', inject(async ({project}) => {
    await project.write({
      'src/index.js': `
        async function sleep(ms) {
          await new Promise((resolve) => {
            setTimeout(resolve, ms);
          });
        }

        async function run() {
          await sleep(100);
          console.log('Hello World!');
        }

        run();
      `
    });

    const output = await project.execJs(`
      import { run } from 'esnext-async';
      import buildEsnext from '../src';
      run(async () => {
        await buildEsnext();
        require('./dist/index.js');
      });
    `);

    expect(output).toBe('Hello World!');
  }));
});
