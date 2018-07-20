import findColor from './findColor';
const textDecorationLines = 'underline|overline|line-through|none';
const textDecorationStyles = 'solid|double|dotted|dashed|wavy';

const linesReg = new RegExp(`(${textDecorationLines})\\s*`, 'ig');
const stylesReg = new RegExp(`(${textDecorationStyles})\\s*`, 'i');

const cache = new Map();

export default function parseTextDecoration(
  textDecoration: string
): {
  color: string;
  style: string;
  lines: string[];
} {
  if (cache.has(textDecoration)) {
    return cache.get(textDecoration);
  }

  let color;
  let decorationLine = '';
  const decorationLines = [];
  let decorationStyle = '';
  let lineResult;

  const colorResult = findColor(textDecoration);
  if (colorResult) {
    color = colorResult;
  }

  // tslint:disable-next-line:no-conditional-assignment
  while ((lineResult = linesReg.exec(textDecoration))) {
    [, decorationLine] = lineResult;
    decorationLines.push(decorationLine);
  }

  const styleResult = stylesReg.exec(textDecoration);

  if (styleResult) {
    [, decorationStyle] = styleResult;
  }

  const result = {
    color,
    style: decorationStyle,
    lines: decorationLines
  };

  cache.set(textDecoration, result);

  return result;
}
