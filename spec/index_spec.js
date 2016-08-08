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

  xit('compiles ES.next modules', withProject(async (project) => {
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

    await project.execJs(`
      import * as path from 'path';
      require(path.resolve('../src/index.js')).default();
    `);
  }));
});
