import {rollup} from 'rollup';

import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default async function() {
  const bundle = await rollup({
    entry: 'src/index.js',
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
        exclude: 'node_modules/**',
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
