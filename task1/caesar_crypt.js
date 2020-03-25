const UPPER_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_ALPHABET = UPPER_ALPHABET.toLowerCase();
const DELTA = 3;

const modifySymbol = (symbol, direction) => {
  let system;
  if (UPPER_ALPHABET.includes(symbol)) system = UPPER_ALPHABET;
  if (LOWER_ALPHABET.includes(symbol)) system = LOWER_ALPHABET;

  if (system && system.includes(symbol)) {
    const index = system.indexOf(symbol);
    const { length } = system;
    let newIndex;
    if (direction === 'decrypt') {
      newIndex = (index + DELTA) % length;
    } else {
      newIndex = (length + index - DELTA) % length;
    }
    return system[newIndex];
  }
  return symbol;
};

const modifyString = (str, direction) => {
  return [...str].map(symbol => modifySymbol(symbol, direction)).join('');
};

const encryptString = str => modifyString(str);
const decryptString = str => modifyString(str, 'decrypt');

module.exports = {
  encrypt: encryptString,
  decrypt: decryptString
};
