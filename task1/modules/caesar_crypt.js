const UPPER_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_ALPHABET = UPPER_ALPHABET.toLowerCase();

const modifySymbol = (symbol, direction, delta) => {
  const shift = +delta;
  let system;
  if (UPPER_ALPHABET.includes(symbol)) system = UPPER_ALPHABET;
  if (LOWER_ALPHABET.includes(symbol)) system = LOWER_ALPHABET;

  if (system && system.includes(symbol)) {
    const index = system.indexOf(symbol);
    const { length } = system;
    let newIndex;
    if (direction === 'decode') {
      newIndex = (index + shift) % length;
    } else {
      newIndex = (length + index - shift) % length;
    }
    return system[newIndex];
  }
  return symbol;
};

const modifyString = (str, direction, delta) => {
  return [...str]
    .map((symbol) => modifySymbol(symbol, direction, delta))
    .join('');
};

const encodeString = (str, delta) => modifyString(str, 'encode', delta);
const decodeString = (str, delta) => modifyString(str, 'decode', delta);

module.exports = {
  encode: encodeString,
  decode: decodeString
};
