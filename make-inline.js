const Inliner = require('inliner');
const fs = require('fs');

const fullPath = `C:\\Users\\datok\\Desktop\\upload\\upload\\0001\\index.html`;

new Inliner('http://127.0.0.1:8887/0001/', function (error, html) {
  console.log(html);
  fs.writeFileSync('test.html',html)
});
return

fs.readFile(fullPath,'utf8', (err,content) => {
  // console.log(content);

  inlineCss(content, {url:'#'})
  .then(function(html) { console.log(html); });
});