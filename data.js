const fs = require('fs');
const path = `C:\\Users\\datok\\Desktop\\upload\\upload\\`;
const files = 'C:\\Users\\datok\\Desktop\\t.txt';

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(files),
});

lineReader.on('line', function(line) {
  const pp = `C:\\Users\\datok\\Desktop\\upload\\upload\\`;
  let fileName = line.replace('./', '');
  fs.readdir(pp + fileName, function(err, items) {
    fs.rename(pp + fileName + '\\' + items[0], pp + fileName + '\\' + 'web');
  });
});

return;
fs.readdir(path, function(err, items) {
  let cnt = 0;
  for (let i = 0; i < items.length; i++) {
    cnt++;
    if (items[i] <= 2997) {

    } else {
      fs.rename(path + items[i], path + (2997 + cnt));
      console.log((2997 + cnt));
    }
  }
});
