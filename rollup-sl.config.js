import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only'
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
const enableBuild = process.env.mode === 'build'

export default {
  input: 'sources/static/shoelace/index.js',
  output: [{ file: `deploy/static/shoelace/index${enableBuild ? '.min' : ''}.js`, format: 'es' }],
  plugins: [
    resolve(),
    commonjs(),
    enableBuild && terser(),
    // Bundle styles into dist/bundle.css
    css({
      output: 'shoelace.css'
    }),
    // Copy Shoelace assets to deploy/static/shoelace
    copy({
      copyOnce: true,
      targets: [
        {
          src: path.resolve(__dirname, 'node_modules/@shoelace-viur/shoelace/dist/assets'),
          dest: path.resolve(__dirname, 'deploy/static/shoelace')
        }
      ]
    })
  ]
};
