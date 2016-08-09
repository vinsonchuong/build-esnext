import Directory from 'directory-helpers';
import {rollup} from 'rollup';

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const directory = new Directory('.');

export default async function() {
  const {main = 'index.js'} = await directory.read('package.json');

  const bundle = await rollup({
    entry: main,
    plugins: [
      nodeResolve({
        browser: true
      }),
      commonjs({
        sourceMap: false
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      babel({
        runtimeHelpers: true,
        exclude: '/**/node_modules/**',
        babelrc: false,
        presets: ['es2015-rollup', 'stage-0', 'react'],
        plugins: ['transform-runtime']
      }),

      uglify()
    ]
  });

  await bundle.write({
    format: 'iife',
    dest: 'dist/dist.js'
  });
}
