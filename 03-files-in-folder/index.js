const path = require('path');
const folder = require('fs/promises');

async function filesInFolder() {
  const files = await folder.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
  for(let file of files){
    if (file.isFile()) {
      const fileName = await path.extname(path.join(__dirname, file.name)).slice(1);
      const fileStat = await folder.lstat(path.join(__dirname, 'secret-folder', file.name));
      console.log(file.name.match(/[A-Za-z]+/)[0] + " - " + fileName + " - " + fileStat.size/1000 + 'kb');
    }
  };
}

filesInFolder();
