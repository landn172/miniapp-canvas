import { findBorderStyle } from './findBorderStyle';
import findColor from './findColor';
import { getSizeAndUnitReg } from './reg';

export function parseBorder(value: string) {
  const borderColor = findColor(value);
  let borderWidth = 0;

  const borderSizeMatch = value.match(getSizeAndUnitReg);
  if (borderSizeMatch) {
    const [size] = borderSizeMatch;
    borderWidth = Number(size);
  }

  const borderStyle = findBorderStyle(value);

  return {
    borderColor,
    borderWidth,
    borderStyle
  };
}
