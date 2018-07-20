const weights = 'bold|bolder|lighter|[1-9]00';
const styles = 'italic|oblique';
const variants = 'small-caps';
const stretches =
  'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded';
const units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q|vw|vh';
const stringREG = '\'([^\']+)\'|"([^"]+)"|[\\w-]+';

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp(`(${weights}) +`, 'i');
const styleRe = new RegExp(`(${styles}) +`, 'i');
const variantRe = new RegExp(`(${variants}) +`, 'i');
const stretchRe = new RegExp(`(${stretches}) +`, 'i');
const sizeFamilyRe = new RegExp(
  '([\\d\\.]+)(' +
    units +
    ') *' +
    '((?:' +
    stringREG +
    ')( *, *(?:' +
    stringREG +
    '))*)'
);

/**
 * Cache font parsing.
 */

const cache: any = {};

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

export default function f(
  str: any,
  defaultHeight?: any
): {
  weight: string;
  style: string;
  stretch: string;
  variant: string;
  size: number;
  unit: string;
  family: string;
} {
  if (defaultHeight == null) {
    if (typeof window !== 'undefined' && window.getComputedStyle) {
      const root = window.getComputedStyle(document.documentElement).fontSize;
      defaultHeight = f(`${root} Arial`, 16).size;
    } else {
      defaultHeight = 16;
    }
  }

  // Cached
  if (cache[str]) {
    return cache[str];
  }

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str);
  if (!sizeFamily) {
    return;
  } // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  };

  // Optional, unordered properties.
  // tslint:disable-next-line:one-variable-per-declaration
  let weight, style, variant, stretch;
  // Stop search at `sizeFamily.index`
  const substr = str.substring(0, sizeFamily.index);
  // tslint:disable-next-line:no-conditional-assignment
  if ((weight = weightRe.exec(substr))) {
    font.weight = weight[1];
  }
  // tslint:disable-next-line:no-conditional-assignment
  if ((style = styleRe.exec(substr))) {
    font.style = style[1];
  }
  // tslint:disable-next-line:no-conditional-assignment
  if ((variant = variantRe.exec(substr))) {
    font.variant = variant[1];
  }
  // tslint:disable-next-line:no-conditional-assignment
  if ((stretch = stretchRe.exec(substr))) {
    font.stretch = stretch[1];
  }

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75;
      break;
    case 'pc':
      font.size *= 16;
      break;
    case 'in':
      font.size *= 96;
      break;
    case 'cm':
      font.size *= 96.0 / 2.54;
      break;
    case 'mm':
      font.size *= 96.0 / 25.4;
      break;
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break;
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75;
      break;
    case 'q':
      font.size *= 96 / 25.4 / 4;
      break;
  }

  if (font.unit === 'vw') {
    if (typeof document !== 'undefined' && document.documentElement) {
      const width = document.documentElement.clientWidth;
      font.size = (width * font.size) / 100;
    }
  } else if (font.unit === 'vh') {
    if (typeof document !== 'undefined' && document.documentElement) {
      const height = document.documentElement.clientHeight;
      font.size = (height * font.size) / 100;
    }
  }

  return (cache[str] = font);
}
