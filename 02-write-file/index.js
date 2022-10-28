const fs = require('fs');
const path = require('path');
const process = require('process');
const outputFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdin: input, stdout: output } = process;

output.write('\nHello! Enter your messages\n\n');

const readLine = require('readline');

const rl = readLine.createInterface({ input, output });

rl.on('line', (input) => {
  if (input.toString().match(/exit/i)) {
    //rl.close();
    process.exit();
  }
  outputFile.write(input + "\n");
});

/*rl.on('close', () => {
  console.log('\nYour text has been written in text.txt\nGood luck!  =)\n');
});*/

process.on('exit', () => {
  console.log('\nYour text has been written in text.txt\nGood luck!  =)\n');
});
/*stdout.write('Hello! Enter text\n');

stdin.on('data', data => {
  if (data.toString().match(/exit/i)) {
    process.exit();
  }
  outputFile.write(data)});
  process.on('exit', (code) => {
    console.log('Good luck!  =)');
  });*/
