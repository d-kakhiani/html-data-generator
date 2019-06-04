import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'app.js',
  output: {
    file: 'public/js/bundle.js',
    format: 'iife',
  },
  sourceMap: true,
  plugins:[
    nodeResolve({
      jsnext: true
    })
  ]
}
