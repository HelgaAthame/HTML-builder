const path = require('path');
const folder = require('fs/promises');

async function bundler () {
  const files = await folder.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
  let arr = [];
  for(let file of files){
    if (file.isFile()) {
      const fileExtension = file.name.match(/\.[A-Za-z\d]+/)[0].slice(1);
      if (fileExtension == 'css') {
        const content = await folder.readFile(path.join(__dirname, 'styles', file.name), { encoding: 'utf8' });
        arr.push(content);

      }

    }
  };
  await folder.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), arr.join("\n"));
}

bundler();
