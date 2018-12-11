import parseFont from '../utils/parseFont';
import parseTextDecoration from '../utils/parseTextDecoration';
import { TimeoutTask } from '../utils/task';
import BaseElement from './BaseElement';

const supportTextDecoration = ['underline', 'overline', 'line-through'];

/**
 * 文本元素
 *
 * @export
 * @class TextElement
 * @extends {BaseElement}
 * @property {string} text 文字
 * @property {string} color 字体颜色
 * @property {number} fontSize 字体大小
 * @property {wx.TextAlignOptions} textAlign 文字对齐方式
 * @property {wx.TextBaseLineOptions} textBaseline 文字基线
 */
export default class TextElement extends BaseElement {
  type = 'text';
  /**
   * 文字
   */
  text: string = '';
  /**
   * 字体颜色
   */
  color: string = '#000000';
  /**
   * 字体大小
   */
  fontSize: number = 16;
  /**
   * 字体
   */
  // tslint:disable-next-line:variable-name
  private _font: string = '';

  get font(): string {
    return this._font;
  }

  set font(value: string) {
    const size = parseFont(value, this.lineHeight).size;
    if (typeof size === 'number') {
      this.fontSize = size;
    }
    this._font = value;
  }

  /**
   * 行高
   */
  lineHeight: number = 20;
  /**
   * 文字对齐方式
   */
  textAlign: wx.TextAlignOptions = 'left';
  /**
   * 文字基线
   */
  textBaseline: wx.TextBaseLineOptions = 'middle';
  /**
   * 文本溢出展示
   */
  private readonly textOverflow: string = 'ellipsis';
  /**
   * 文本修饰
   */
  textDecoration: string = '';
  /**
   * 展示行数
   */
  lineClamp: number = 1;

  /**
   * Creates an instance of TextElement.
   * @memberof TextElement
   */
  constructor() {
    super();
  }

  draw(ctx: wx.CanvasContext) {
    const { left, top } = this;

    ctx.save();
    if (this.font) {
      ctx.font = this.font;
    }
    ctx.setFillStyle(this.color);
    ctx.setFontSize(this.fontSize);
    ctx.setTextBaseline(this.textBaseline);
    ctx.setTextAlign(this.textAlign);
    const realRect = this.maseureTextRealRect(ctx, this.text);
    // 没有设置宽
    if (!this.width) {
      ctx.fillText(this.text, left, top);
      this.drawTextLine(ctx, left, realRect.top, this.text);
    } else {
      const fillRealTop = realRect.top;

      // 如果一行能写完
      if (realRect.width <= this.width) {
        ctx.fillText(this.text, left, top);

        this.drawTextLine(ctx, left, fillRealTop, this.text);
      } else {
        this.drawMultiLineText(ctx, fillRealTop);
      }
    }

    ctx.restore();
  }

  private drawMultiLineText(ctx: wx.CanvasContext, fillRealTop: number) {
    let text = '';
    let lineNum = 1;
    let fillTop = this.top;
    const len = this.text.length;
    const left = this.left;

    for (let i = 0; i < len; ) {
      const lastText = text;
      text += this.text[i];
      const [width] = measureText(ctx, text, this.fontSize, this.lineHeight);
      // 需要换行
      if (width > this.width) {
        if (lineNum === this.lineClamp) {
          if (i !== len) {
            text = lastText.substring(0, lastText.length - 1) + '...';
            ctx.fillText(text, left, fillTop);
            this.drawTextLine(ctx, left, fillRealTop, text);
            return;
          }
        }
        ctx.fillText(lastText, left, fillTop);
        this.drawTextLine(ctx, left, fillRealTop, lastText);
        text = '';
        fillTop += this.lineHeight;
        fillRealTop += this.lineHeight;
        lineNum++;
        continue;
      }
      // 最后一行宽度不足时
      else if (i === len - 1) {
        ctx.fillText(text, left, fillTop);
        this.drawTextLine(ctx, left, fillRealTop, text);
        return;
      }
      i++;
    }
  }

  private drawTextLine(
    ctx: wx.CanvasContext,
    left: number,
    top: number,
    text: string
  ) {
    let textDecorationLines: string[] = [];

    const { textDecoration, fontSize } = this;

    const { color = this.color, lines, style } = parseTextDecoration(
      textDecoration
    );

    textDecorationLines = [
      ...lines.filter(line => supportTextDecoration.indexOf(line) >= 0)
    ];

    if (textDecorationLines.length === 0) {
      return;
    }

    const x = left - 1;
    let y = top;
    let width = 0;
    const height = 1;

    const [textLineWidth] = measureText(
      ctx,
      text,
      this.fontSize,
      this.lineHeight
    );

    width = textLineWidth + 2;

    while (textDecorationLines.length) {
      const line = textDecorationLines.shift();
      switch (line) {
        case 'underline':
          y = ~~(top + fontSize);
          break;
        case 'line-through':
          y = ~~(top + fontSize / 2);
          break;
        case 'overline':
          y = ~~top - 2;
          break;
        default:
          break;
      }

      ctx.save();

      // ctx.setFillStyle(color || this.color);
      // ctx.fillRect(x, y, width, height);
      drawTextDecorationLine();

      ctx.restore();
    }

    function drawTextDecorationLine() {
      ctx.beginPath();
      ctx.setStrokeStyle(color);
      ctx.setLineWidth(1);

      if (style === 'dashed') {
        ctx.setLineDash([8, 4], 0);
      }

      if (style === 'dotted') {
        ctx.setLineDash([2, 2], 0);
        ctx.setLineWidth(2);
      }

      ctx.moveTo(x, y + 0.5);
      ctx.lineTo(x + width, y + 0.5);
      ctx.closePath();
      ctx.stroke();
    }
  }

  private maseureTextRealRect(ctx: wx.CanvasContext, text: string) {
    const { top, left, textBaseline, fontSize, lineHeight } = this;

    const [width, height] = measureText(ctx, text, fontSize, lineHeight);

    // 调整实际视觉位置值
    const hackFixValue = 2;

    if (textBaseline === 'top') {
      return {
        width,
        height,
        top: top + hackFixValue,
        left
      };
    }

    if (textBaseline === 'middle') {
      return {
        width,
        height,
        top: ~~(top - fontSize / 2),
        left
      };
    }

    if (textBaseline === 'bottom') {
      return {
        width,
        height,
        top: ~~(top - fontSize) - hackFixValue,
        left
      };
    }
  }
}

function measureText(
  ctx: wx.CanvasContext,
  text: string = '',
  fontSize: number,
  lineHeight: number = 0
): number[] {
  if (!ctx) {
    return [0, 0];
  }
  const { width } = ctx.measureText(text);

  const height = lineHeight || fontSize * 1.2;
  return [width, height].map(Math.round);
}
