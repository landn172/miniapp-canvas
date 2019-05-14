import { ICanvasToTempFilePath, IGetCanvasContext, IGetImageInfo, IGetSystemInfoSync } from '../platform';

export const getCanvasContext: IGetCanvasContext = (id: string, ctx?: any) => {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  if (canvas.getContext) {
    return polyfillContext(canvas.getContext('2d'));
  }
};

export function getCanvasWidthAndHeight(
  ctx: any
): {
  width: number;
  height: number;
} {
  const canvas = ctx.canvas;
  return canvas;
}

function polyfillContext(ctx: any) {
  ctx.setTextBaseline = (value: string) => {
    ctx.textBaseline = value;
  };
  ctx.setTextAlign = (value: string) => {
    ctx.textAlign = value;
  };
  ctx.draw = (reserve: boolean = false, cb: any) => {
    // 清除画布
    if (!reserve) {
      // const { width = 0, height = 0 } = ctx.canvas;
      // ctx.clearRect(0, 0, width, height);
    }
    if (cb) {
      cb();
    }
  };
  ctx.setGlobalAlpha = (value: number) => {
    ctx.globalAlpha = value;
  };

  ctx.setShadow = (
    offsetX: number = 0,
    offsetY: number = 0,
    blur: number = 0,
    color: string
  ) => {
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
    if (color) {
      ctx.shadowColor = color;
    }
    ctx.shadowBlur = blur;
  };

  ctx.setStrokeStyle = (value: string) => {
    ctx.strokeStyle = value;
  };

  ctx.setLineWidth = (value: string) => {
    ctx.lineWidth = value;
  };

  return ctx;
}

export const canvasToTempFilePath: ICanvasToTempFilePath = (
  canvasId: string,
  ctx?: any
) => {
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value(callback: any, type: string, quality: number) {
        const canvas = this;
        setTimeout(() => {
          const binStr = atob(canvas.toDataURL(type, quality).split(',')[1]);
          const len = binStr.length;
          const arr = new Uint8Array(len);

          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback(new Blob([arr], { type: type || 'image/png' }));
        });
      }
    });
  }
  return new Promise(resolve => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      resolve({
        tempFilePath: url
      });
    });
  });
};

export const getImageInfo: IGetImageInfo = (url: string) => {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve({
        path: img,
        width: img.width,
        height: img.height
      });
    };
  });
};

export const getSystemInfoSync: IGetSystemInfoSync = () => {
  return {
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    screenHeight: window.outerHeight,
    screenWidth: window.outerWidth
  };
};
