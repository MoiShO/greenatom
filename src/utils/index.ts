function isMany(value: number) {
  return value >= 5 && value <= 20;
}

function isOne(value: number) {
  return value === 1;
}

function isSeveral(value: number) {
  return value >= 2 && value <= 4;
}

const getPlural = (words: string[]) => (number: number) => {
  let value = Math.abs(number);
  value %= 100;
  if (isMany(value)) {
    return words[2];
  }
  value %= 10;
  if (isOne(value)) {
    return words[0];
  }
  if (isSeveral(value)) {
    return words[1];
  }

  return words[2];
};

export const getPluralValueString = (pluralWords: string[]) => (val: number) => `${val}${getPlural(pluralWords)(val)}`;

export const getPluralTransfers = getPluralValueString(['пересадка', 'пересадки', ' пересадок']);

