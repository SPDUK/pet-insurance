export const enumToCapitalized = (str) =>
  str
    .toLowerCase()
    .split('_')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');
