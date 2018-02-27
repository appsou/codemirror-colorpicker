import packageJSON from '../package.json'
import postcss from 'rollup-plugin-postcss'
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import autoprefixer from 'autoprefixer'

// rollup.config.js
export default [{
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.min.js',
    format: 'iife',
    globals: {
      "codemirror" : "CodeMirror"
    },
    external: ['codemirror']
  },
  name: 'CodeMirrorColorPicker',  
  plugins : [
    //scss({output : 'dist/' + packageJSON.name + '.css'}),
    postcss({
      extract: 'dist/' + packageJSON.name + '.css',
      plugins: [
        autoprefixer()
      ],
      extensions: ['.scss']
    }),     
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
}, {
  input: 'src/index.js',
  output: {
    file: 'dist/' + packageJSON.name + '.js',
    format: 'umd',
    globals: {
      "codemirror" : "CodeMirror"
    },
    external: ['codemirror']
  },
  name: 'codemirror-colorpicker',
  plugins : [
    postcss({
      extract: 'dist/' + packageJSON.name + '.css',
      plugins: [
        autoprefixer()
      ],
      extensions: ['.scss']
    }),         
    babel({
      exclude: 'node_modules/**'
    })
  ]
}];