// const PSD = require('psd');
// const psd = PSD.fromFile('./stream.psd');
// psd.parse()
// console.log(psd.tree().childrenAtPath(['Main Area', 'Fabio\'s Post','Movie Images'])[0].export());
// const tf = require('@tensorflow/tfjs');
//
// // Optional Load the binding:
// // Use '@tensorflow/tfjs-node-gpu' if running with GPU.
// require('@tensorflow/tfjs-node');
//
// // Train a simple model:
// const model = tf.sequential();
// model.add(tf.layers.dense({units: 100, activation: 'relu', inputShape: [10]}));
// model.add(tf.layers.dense({units: 1, activation: 'linear'}));
// model.compile({optimizer: 'sgd', loss: 'meanSquaredError'});
//
// const xs = tf.randomNormal([100, 10]);
// const ys = tf.randomNormal([100, 1]);
//
// model.fit(xs, ys, {
//   epochs: 100,
//   callbacks: {
//     onEpochEnd: (epoch, log) =>
//         console.log(`Epoch ${epoch}: loss = ${log.loss}`),
//   },
// })
// ;
// const fs = require('fs');
// const path = require('path');
// const cv = require('opencv');
// cv.readImage("./node_modules/opencv/examples/files/mona.png", function(err, im){
//   im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
//     for (var i=0;i<faces.length; i++){
//       var x = faces[i]
//       im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
//     }
//     im.save('./out.jpg');
//   });
// })