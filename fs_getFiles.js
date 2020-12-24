// fs_getFiles.js

const fs = require('fs');
const path = require('path');

const getFiles = (dirpath, callback) => {
  const dirents = fs.readdirSync(dirpath, { withFileTypes: true });

  dirents.forEach((dirent) => {
    const fp = path.join(dirpath, dirent.name);
    if (dirent.isDirectory()) {
      getFiles(fp, callback);
    } else {
      // callback(dirent.name);
      callback(fp);
      // console.log("--------------  getFiles -> fp", fp)
    }
  });
};

const files = [];
getFiles('src/sub', (fp) => files.push(fp));
// getFiles('./src', (fp) => files.push(fp));

const sels = files
  // .filter((fp) => {
  //   return fp.endsWith('.html');
  // })
  // .map((fp) => {
  //   // console.log('page', page);
  //   return fp.substr(4);
  // });

// console.log('sels', sels);
// console.log('files', files);

// sels[('src\\index.html', 'src\\sub\\hbs.html', 'src\\sub\\js.html')];
// sels[('index.html', 'sub\\hbs.html', 'sub\\js.html')];

module.exports = sels;