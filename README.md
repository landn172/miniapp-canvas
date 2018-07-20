# miniapp-canvas

使用 json 配置生成 canvas 内容

## 支持类型

- Text 文字
- Image 图片
- Rect 矩形

<!-- START doctoc -->
<!-- END doctoc -->

## API

## Classes

<dl>
<dt><a href="#BaseElement">BaseElement</a></dt>
<dd></dd>
<dt><a href="#ImageElement">ImageElement</a> ⇐ <code><a href="#BaseElement">BaseElement</a></code></dt>
<dd></dd>
<dt><a href="#RectElement">RectElement</a> ⇐ <code><a href="#BaseElement">BaseElement</a></code></dt>
<dd></dd>
<dt><a href="#TextElement">TextElement</a> ⇐ <code><a href="#BaseElement">BaseElement</a></code></dt>
<dd></dd>
<dt><a href="#MiniappCanvas">MiniappCanvas</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#cache">cache</a></dt>
<dd><p>Cache font parsing.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#promisify">promisify(method, params)</a></dt>
<dd><p>将方法promise化
替换[&#39;fail&#39;, &#39;success&#39;, &#39;complete&#39;]</p></dd>
<dt><a href="#rpx2px">rpx2px(rpx)</a></dt>
<dd><p>rpx =&gt; px</p></dd>
<dt><a href="#f">f(str)</a> ⇒ <code>Object</code></dt>
<dd><p>Parse font <code>str</code>.</p></dd>
</dl>

<a name="BaseElement"></a>

## BaseElement
**Kind**: global class  
**Export**:   

* [BaseElement](#BaseElement)
    * [new BaseElement()](#new_BaseElement_new)
    * _instance_
        * [.loadAttr(attrs, unit)](#BaseElement+loadAttr)
    * _static_
        * [.BaseElement](#BaseElement.BaseElement)
            * [new BaseElement([width], [height], [top], [left])](#new_BaseElement.BaseElement_new)

<a name="new_BaseElement_new"></a>

### new BaseElement()
<p>基础元素</p>

<a name="BaseElement+loadAttr"></a>

### baseElement.loadAttr(attrs, unit)
<p>加载属性配置</p>

**Kind**: instance method of [<code>BaseElement</code>](#BaseElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attrs | <code>object</code> |  |  |
| unit | <code>string</code> | <code>&quot;px&quot;</code> | <p>默认px</p> |

**Example**  
```js
{
   width: 100,
   height: 200
}
```
<a name="BaseElement.BaseElement"></a>

### BaseElement.BaseElement
**Kind**: static class of [<code>BaseElement</code>](#BaseElement)  
<a name="new_BaseElement.BaseElement_new"></a>

#### new BaseElement([width], [height], [top], [left])
<p>Creates an instance of BaseElement.</p>


| Param | Type | Default |
| --- | --- | --- |
| [width] | <code>number</code> | <code>0</code> | 
| [height] | <code>number</code> | <code>0</code> | 
| [top] | <code>number</code> | <code>0</code> | 
| [left] | <code>number</code> | <code>0</code> | 

<a name="ImageElement"></a>

## ImageElement ⇐ [<code>BaseElement</code>](#BaseElement)
**Kind**: global class  
**Extends**: [<code>BaseElement</code>](#BaseElement)  
**Export**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| circle | <code>boolean</code> | <p>显示圆形</p> |


* [ImageElement](#ImageElement) ⇐ [<code>BaseElement</code>](#BaseElement)
    * [new ImageElement()](#new_ImageElement_new)
    * _instance_
        * [.loadAttr(attrs, unit)](#BaseElement+loadAttr)
    * _static_
        * [.ImageElement](#ImageElement.ImageElement)
            * [new ImageElement()](#new_ImageElement.ImageElement_new)

<a name="new_ImageElement_new"></a>

### new ImageElement()
<p>图片元素</p>

<a name="BaseElement+loadAttr"></a>

### imageElement.loadAttr(attrs, unit)
<p>加载属性配置</p>

**Kind**: instance method of [<code>ImageElement</code>](#ImageElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attrs | <code>object</code> |  |  |
| unit | <code>string</code> | <code>&quot;px&quot;</code> | <p>默认px</p> |

**Example**  
```js
{
   width: 100,
   height: 200
}
```
<a name="ImageElement.ImageElement"></a>

### ImageElement.ImageElement
**Kind**: static class of [<code>ImageElement</code>](#ImageElement)  
<a name="new_ImageElement.ImageElement_new"></a>

#### new ImageElement()
<p>Creates an instance of ImageElement.</p>

<a name="RectElement"></a>

## RectElement ⇐ [<code>BaseElement</code>](#BaseElement)
**Kind**: global class  
**Extends**: [<code>BaseElement</code>](#BaseElement)  
**Export**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| bgColor | <code>string</code> | <p>背景颜色</p> |
| stroke | <code>string</code> | <p>边框样式</p> |
| solid | <code>boolean</code> | <p>是否实心</p> |
| shadow | <code>Array.&lt;any&gt;</code> | <p>阴影样式</p> |


* [RectElement](#RectElement) ⇐ [<code>BaseElement</code>](#BaseElement)
    * [new RectElement()](#new_RectElement_new)
    * _instance_
        * [.drawWithBorder(ctx, [clip])](#RectElement+drawWithBorder)
        * [.loadAttr(attrs, unit)](#BaseElement+loadAttr)
    * _static_
        * [.RectElement](#RectElement.RectElement)
            * [new RectElement()](#new_RectElement.RectElement_new)

<a name="new_RectElement_new"></a>

### new RectElement()
<p>矩形元素</p>

<a name="RectElement+drawWithBorder"></a>

### rectElement.drawWithBorder(ctx, [clip])
<p>带边框绘制</p>

**Kind**: instance method of [<code>RectElement</code>](#RectElement)  

| Param | Type | Default |
| --- | --- | --- |
| ctx | <code>wx.CanvasContext</code> |  | 
| [clip] | <code>boolean</code> | <code>false</code> | 

<a name="BaseElement+loadAttr"></a>

### rectElement.loadAttr(attrs, unit)
<p>加载属性配置</p>

**Kind**: instance method of [<code>RectElement</code>](#RectElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attrs | <code>object</code> |  |  |
| unit | <code>string</code> | <code>&quot;px&quot;</code> | <p>默认px</p> |

**Example**  
```js
{
   width: 100,
   height: 200
}
```
<a name="RectElement.RectElement"></a>

### RectElement.RectElement
**Kind**: static class of [<code>RectElement</code>](#RectElement)  
<a name="new_RectElement.RectElement_new"></a>

#### new RectElement()
<p>Creates an instance of RectElement.</p>

<a name="TextElement"></a>

## TextElement ⇐ [<code>BaseElement</code>](#BaseElement)
**Kind**: global class  
**Extends**: [<code>BaseElement</code>](#BaseElement)  
**Export**:   
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| text | <code>string</code> | <p>文字</p> |
| color | <code>string</code> | <p>字体颜色</p> |
| fontSize | <code>number</code> | <p>字体大小</p> |
| textAlign | <code>wx.TextAlignOptions</code> | <p>文字对齐方式</p> |
| textBaseline | <code>wx.TextBaseLineOptions</code> | <p>文字基线</p> |


* [TextElement](#TextElement) ⇐ [<code>BaseElement</code>](#BaseElement)
    * [new TextElement()](#new_TextElement_new)
    * _instance_
        * [.font](#TextElement+font)
        * [.loadAttr(attrs, unit)](#BaseElement+loadAttr)
    * _static_
        * [.TextElement](#TextElement.TextElement)
            * [new TextElement()](#new_TextElement.TextElement_new)

<a name="new_TextElement_new"></a>

### new TextElement()
<p>文本元素</p>

<a name="TextElement+font"></a>

### textElement.font
<p>字体</p>

**Kind**: instance property of [<code>TextElement</code>](#TextElement)  
<a name="BaseElement+loadAttr"></a>

### textElement.loadAttr(attrs, unit)
<p>加载属性配置</p>

**Kind**: instance method of [<code>TextElement</code>](#TextElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| attrs | <code>object</code> |  |  |
| unit | <code>string</code> | <code>&quot;px&quot;</code> | <p>默认px</p> |

**Example**  
```js
{
   width: 100,
   height: 200
}
```
<a name="TextElement.TextElement"></a>

### TextElement.TextElement
**Kind**: static class of [<code>TextElement</code>](#TextElement)  
<a name="new_TextElement.TextElement_new"></a>

#### new TextElement()
<p>Creates an instance of TextElement.</p>

<a name="MiniappCanvas"></a>

## MiniappCanvas
**Kind**: global class  
**Export**:   

* [MiniappCanvas](#MiniappCanvas)
    * [new MiniappCanvas()](#new_MiniappCanvas_new)
    * [.loadConfig(config)](#MiniappCanvas+loadConfig)
    * [.clear()](#MiniappCanvas+clear)
    * [.draw()](#MiniappCanvas+draw)
    * [.saveImage()](#MiniappCanvas+saveImage)

<a name="new_MiniappCanvas_new"></a>

### new MiniappCanvas()
<p>miniapp-canvas</p>

<a name="MiniappCanvas+loadConfig"></a>

### miniappCanvas.loadConfig(config)
<p>加载json配置文件</p>

**Kind**: instance method of [<code>MiniappCanvas</code>](#MiniappCanvas)  

| Param | Type |
| --- | --- |
| config | <code>Array</code> | 

<a name="MiniappCanvas+clear"></a>

### miniappCanvas.clear()
<p>清空加载的元素</p>

**Kind**: instance method of [<code>MiniappCanvas</code>](#MiniappCanvas)  
<a name="MiniappCanvas+draw"></a>

### miniappCanvas.draw()
<p>开始绘制canvas</p>

**Kind**: instance method of [<code>MiniappCanvas</code>](#MiniappCanvas)  
<a name="MiniappCanvas+saveImage"></a>

### miniappCanvas.saveImage()
<p>保存canvas截图</p>

**Kind**: instance method of [<code>MiniappCanvas</code>](#MiniappCanvas)  
<a name="cache"></a>

## cache
<p>Cache font parsing.</p>

**Kind**: global constant  
<a name="promisify"></a>

## promisify(method, params)
<p>将方法promise化
替换['fail', 'success', 'complete']</p>

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| method | <code>any</code> | <p>微信的方法</p> |
| params | <code>object</code> | <p>传入的方法</p> |

<a name="rpx2px"></a>

## rpx2px(rpx)
<p>rpx =&gt; px</p>

**Kind**: global function  

| Param |
| --- |
| rpx | 

**Example**  
```js
iphone6
 rpx2px(750) => 375
 rpx2px('1rpx solid #000') => '0.5px solid #000'
```
<a name="f"></a>

## f(str) ⇒ <code>Object</code>
<p>Parse font <code>str</code>.</p>

**Kind**: global function  
**Returns**: <code>Object</code> - <p>Parsed font. <code>size</code> is in device units. <code>unit</code> is the unit
  appearing in the input string.</p>  
**Api**: private  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 

