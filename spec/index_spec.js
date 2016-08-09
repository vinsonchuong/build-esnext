import Directory from 'directory-helpers';

function withProject(test) {
  return async () => {
    const project = new Directory('project');
    try {
      await test(project);
    } finally {
      await project.remove();
    }
  };
}

describe('build-esnext', () => {
  it('acts during the compile stage', async () => {
    const directory = new Directory('.');
    const {stage} = await directory.read('package.json');
    expect(stage).toBe('compile');
  });

  it('compiles ES.next modules', withProject(async (project) => {
    await project.write({
      'package.json': {
        name: 'project'
      },
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
        require('./dist/dist.js');
      });

    `);

    expect(output).toBe('Hello World!');
  }));
});
