import BaseElement from './BaseElement';
import ImageElement from './ImageElement';
import QRCodeElement from './QRCodeElement';
import RectElement from './RectElement';
import TextElement from './TextElement';

export { BaseElement, ImageElement, RectElement, TextElement, QRCodeElement };

export interface ITypeMap {
  image: ImageElementType;
  rect: RectElementType;
  text: TextElementType;
  qrcode: QRCodeElementType;
}

export interface IType2Element {
  image: ImageElement;
  rect: RectElement;
  text: TextElement;
  qrcode: QRCodeElement;
}

export type TypeKey = keyof ITypeMap;

type PartialExclude<
  T extends { type: string },
  K = 'loadAttr' | 'preload' | 'getAttrs'
> = { [P in keyof T]?: P extends K ? never : T[P] } & {
  type: TypeKey
};

export type ImageElementType = PartialExclude<ImageElement>;
export type QRCodeElementType = PartialExclude<QRCodeElement>;
export type RectElementType = PartialExclude<RectElement>;
export type TextElementType = PartialExclude<TextElement>;
