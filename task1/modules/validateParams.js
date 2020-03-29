const errorHandler = require('./errorHandler');

const validateParams = (shift, action) => {
  if (!shift) {
    errorHandler('Required', 11, 'Please, write shift parameter');
  }

  if (!action) {
    errorHandler('Required', 12, 'Please, write action parameter');
  }

  if (typeof +shift !== 'number') {
    errorHandler(
      'Invalid type',
      21,
      'Please, write Number for shift parameter'
    );
  }

  if (action !== 'encode' && action !== 'decode') {
    errorHandler(
      'Invalid parameter',
      22,
      'Please, write encode/decode for action parameter'
    );
  }
};

module.exports = validateParams;
