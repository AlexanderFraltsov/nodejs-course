const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { program } = require('commander');

const validateParams = require('./modules/validateParams');
const validatePath = require('./modules/validatePath');
const ModifyStream = require('./modules/modifyStream');
const { encode, decode } = require('./modules/caesar_crypt');
const errorHandler = require('./modules/errorHandler');

process.on('exit', (code) => {
  console.log(`Process exited with code ${code}`);
});

program
  .storeOptionsAsProperties(false)
  .passCommandToAction(false)
  .version('0.0.1');

program
  .option('-s, --shift <number>', 'a shift')
  .option('-i, --input <string>', 'an input file')
  .option('-o, --output <string>', 'an output file')
  .option('-a, --action <string>', 'an action encode/decode')
  .parse(process.argv);

const init = ({ shift, action, input, output }) => {
  try {
    const inputPath = input ? path.join(__dirname, input) : null;
    const outputPath = output ? path.join(__dirname, output) : null;

    validateParams(shift, action);
    validatePath(inputPath, outputPath);

    const modifyFn = action === 'encode' ? encode : decode;

    const readable = input
      ? fs.createReadStream(inputPath, { highWaterMark: 32 * 1024 })
      : process.stdin;

    const transform = new ModifyStream({ modifyFn, shift });

    const writable = output
      ? fs.createWriteStream(outputPath, {
          highWaterMark: 32 * 1024,
          flags: 'a'
        })
      : process.stdout;

    pipeline(readable, transform, writable, (err) => {
      if (err) {
        errorHandler('Pipeline', 30, err.message);
      }
      console.log('Done!');
    });
  } catch (err) {
    console.error(err.message);
  }
};

init(program.opts());
