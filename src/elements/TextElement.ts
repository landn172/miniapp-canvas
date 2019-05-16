import { deprecated } from '../utils/decorators';
import { customElement } from '../utils/lit-plugin';
import parseFont from '../utils/parseFont';
import { parseShadow } from '../utils/parseShadow';
import parseTextDecoration from '../utils/parseTextDecoration';
import BaseElement from './BaseElement';

const supportTextDecoration = ['underline', 'overline', 'line-through'];

/**
 * 文本元素
 *
 * @export
 * @class TextElement
 * @extends {BaseElement}
 * @attr {string} text
 * @attr {string} color
 * @attr {number} fontSize
 * @attr {any} textAlign
 * @attr {any} textBaseline
 */
@customElement('m-text')
export default class TextElement extends BaseElement {
  type = 'text';
  cacheProps: any;
  /**
   * 文字
   */
  get text() {
    return this.textContent;
  }

  @deprecated('please use [textContent] instead')
  set text(value: string) {
    this.textContent = value;
  }
  /**
   * 文字
   */
  textContent: string = '';

  /**
   * 字体颜色
   */
  color: string = '#000000';
  /**
   * 字体大小
   */
  fontSize: number = 16;
  /**
   * 字体阴影
   */
  textShadow: string = '';
  /**
   * 字体
   */
  // tslint:disable-next-line:variable-name
  private _font: string = '';

  get font(): string {
    if (this._font) {
      return this._font;
    }

    return `${this.fontSize}px sans-serif`;
  }

  set font(value: string) {
    this._font = value;
    const size = parseFont(value, this.lineHeight).size;
    if (typeof size === 'number') {
      this.fontSize = size;
    }
  }

  /**
   * 行高
   */
  lineHeight: number = 20;
  /**
   * 文字对齐方式
   */
  textAlign: string = 'left';
  /**
   * 文字基线
   */
  textBaseline: string = 'middle';
  /**
   * 文本溢出展示
   */
  private readonly textOverflow: string = 'ellipsis';
  /**
   * 文本修饰
   */
  textDecoration: string = '';
  /**
   * 展示行数,用于文本溢出
   */
  lineClamp: number = 1;

  /**
   * Creates an instance of TextElement.
   * @memberof TextElement
   */
  constructor() {
    super();
  }

  /**
   * canvas和html绘制字体有差异，需要磨平
   */
  fixDrawText(ctx: wxNS.CanvasContext) {
    this.top += this.lineHeight / 2 + 2;
  }

  /**
   * canvas绘制字体有差异
   */
  fixDrawBase(ctx: wxNS.CanvasContext) {
    this.cacheProps = {
      width: this.width,
      height: this.height
    };
    const realRect = this.maseureTextRealRect(ctx, this.textContent);
    if (!this.width) {
      this.width = realRect.width;
    }
    if (!this.height) {
      this.height = realRect.height * this.lineClamp;
    }
  }

  revertChange() {
    const props = this.cacheProps || {};

    Object.keys(props).forEach(key => {
      this[key] = props[key];
    });

    this.cacheProps = {};
  }

  draw(ctx: wxNS.CanvasContext) {
    // canvas和html绘制字体有差异，需要调整
    ctx.save();
    ctx.font = `${this.fontSize}px`;
    this.textBaseline = 'middle';
    ctx.setTextBaseline(this.textBaseline);
    ctx.setTextAlign(this.textAlign);
    if (this.font) {
      ctx.font = this.font;
    }

    this.fixDrawBase(ctx);
    super.draw(ctx);
    this.revertChange();
    this.fixDrawText(ctx);
    this.setTextShadowStyle(ctx);

    const { left, top } = this;
    const text = this.textContent;

    ctx.fillStyle = this.color;

    const realRect = this.maseureTextRealRect(ctx, text);
    // 没有设置宽
    if (!this.width) {
      ctx.fillText(text, left, top);
      this.drawTextLine(ctx, left, realRect.top, text);
    } else {
      const fillRealTop = realRect.top;

      // 如果一行能写完
      if (realRect.width <= this.width) {
        ctx.fillText(text, left, top);

        this.drawTextLine(ctx, left, fillRealTop, text);
      } else {
        this.drawMultiLineText(ctx, fillRealTop);
      }
    }

    ctx.restore();
  }

  /**
   * 设置文本阴影样式
   */
  private setTextShadowStyle(ctx: wxNS.CanvasContext) {
    const [shadow] = parseShadow(this.textShadow);
    if (!shadow || !shadow.length) {
      // @ts-ignore
      ctx.shadowColor = '';
      return;
    }
    const [
      shadowOffsetX = 0,
      shadowOffsetY = 0,
      shadowBlur = 0,
      shadowColor
    ] = shadow;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = shadowColor;
    ctx.shadowOffsetX = shadowOffsetX;
    ctx.shadowOffsetY = shadowOffsetY;
  }

  private drawMultiLineText(ctx: wxNS.CanvasContext, fillRealTop: number) {
    let text = '';
    let lineNum = 1;
    let fillTop = this.top;
    const textContent = this.textContent;
    const len = textContent.length;
    const left = this.left;

    for (let i = 0; i < len; ) {
      const lastText = text;
      text += textContent[i];
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
    ctx: wxNS.CanvasContext,
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
        ctx.setLineDash([4, 2], 0);
        ctx.lineDashOffset = 1;
      }

      if (style === 'dotted') {
        ctx.setLineDash([2, 1], 0);
        ctx.setLineWidth(1);
        ctx.lineDashOffset = 2;
      }

      ctx.moveTo(x, y - 0.5);
      ctx.lineTo(x + width, y - 0.5);
      ctx.closePath();
      ctx.stroke();
    }
  }

  private maseureTextRealRect(ctx: wxNS.CanvasContext, text: string) {
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
  ctx: wxNS.CanvasContext,
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

declare global {
  // tslint:disable-next-line: interface-name
  interface HTMLElementTagNameMap {
    'm-text': TextElement;
  }
}
