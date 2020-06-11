const bordertyles = 'solid|double|dotted|dashed|wavy';
const stylesReg = new RegExp(`(${bordertyles})\\s*`, 'i');

export function findBorderStyle(str: string) {
  const styleResult = stylesReg.exec(str);
  let borderStyle = '';
  if (styleResult) {
    [, borderStyle] = styleResult;
  }
  return borderStyle;
}
