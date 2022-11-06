const path = require('path');
const folder = require('fs/promises');

async function bundler() {
  const projectDist = await folder.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
  let template = await folder.readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });
  const componentNames = template.match(/{{[A-Za-z]+}}/g);
  const components = await folder.readdir(path.join(__dirname, 'components'), { withFileTypes: false });
  for (let i = 0; i < components.length; i++) {
    for (let j = 0; j < componentNames.length; j++)
      if (componentNames[j].slice(2, -2) == components[i].match(/[A-Za-z]+/)[0]) {
        const content = await folder.readFile(path.join(__dirname, 'components', components[i]), { encoding: 'utf8' });
        template = template.replace(componentNames[j], content);
      }
  }
  await folder.writeFile(path.join(__dirname, 'project-dist', 'index.html'), template);
}

async function styler() {
  const files = await folder.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  let arr = [];
  for (let file of files) {
    if (file.isFile()) {
      const fileExtension = file.name.match(/\.[A-Za-z\d]+/)[0].slice(1);
      if (fileExtension == 'css') {
        const content = await folder.readFile(path.join(__dirname, 'styles', file.name), { encoding: 'utf8' });
        arr.push(content);

      }

    }
  };
  await folder.writeFile(path.join(__dirname, 'project-dist', 'style.css'), arr.join("\n"));
}

async function copier(folderPath, destPath) {
  const folderCopy = await folder.mkdir(destPath, { recursive: true });

  async function remove(somePath) {
    const filesCopied = await folder.readdir(somePath, { withFileTypes: true });
    for (let fileCopied of filesCopied) {

      if (fileCopied.isDirectory()) {

        let someNewPath = path.join(somePath, fileCopied.name);
        await remove(someNewPath);
        await folder.rm(someNewPath, { recursive: true });
      } else if (fileCopied.isFile()) {
        await folder.unlink(path.join(somePath, fileCopied.name));
      }
    }
  }

  await remove(destPath);

  await folder.mkdir(destPath, { recursive: true });

  const files = await folder.readdir(folderPath, { withFileTypes: true });

  for (let file of files) {
    if (file.isFile()) {
      await folder.copyFile(path.join(folderPath, file.name), path.join(destPath, file.name));

    } else {
      const newPath = path.join(folderPath, file.name);
      const newDest = path.join(destPath, file.name);
      copier(newPath, newDest);
    }
  };

}

bundler();
styler();
const assetPath = path.join(__dirname, 'assets');
const destAssetPath = path.join(__dirname, 'project-dist', 'assets');

copier(assetPath, destAssetPath);
