const { Transform } = require('stream');

class ModifyStream extends Transform {
  constructor(options) {
    super(options);
    this.modifyFn = options.modifyFn;
    this.shift = options.shift;
  }
  _transform(chunk, encoding, callback) {
    this.push(this.modifyFn(chunk.toString(), this.shift));
    callback();
  }
}

module.exports = ModifyStream;
