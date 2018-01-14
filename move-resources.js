const fs = require('fs');

const sourceFolder = './dist';
const newPath = './dist/public';

fs.existsSync(newPath) || fs.mkdirSync('./dist/public');
fs.readdirSync(sourceFolder).forEach(file => {
  const pattern = /\w+.(js|eot|svg|woff2|ttf|woff|json|css)/g;
  if (file.match(pattern)) {
    fs.rename(sourceFolder + '/' + file, newPath + '/' + file, function (err) {
      if (err) throw err;
    })
  }
});
