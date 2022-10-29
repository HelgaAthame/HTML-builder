const path = require('path');
const folder = require('fs/promises');

async function copyDir () {
  const folderCopy = await folder.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});
  const filesCopied = await folder.readdir(path.join(__dirname, 'files-copy'), {withFileTypes: true});
  for(let fileCopied of filesCopied){
    await folder.unlink(path.join(__dirname, 'files-copy', fileCopied.name));
  }

  const files = await folder.readdir(path.join(__dirname, 'files'), {withFileTypes: true});

  for(let file of files){
    if (file.isFile()) {
      await folder.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name));
    }
  }
}

copyDir ();
