import { getSizeAndUnitReg } from "../../utils/reg";
import {
  ICanvasToTempFilePath,
  IGetCanvasContext,
  IGetImageInfo,
  IGetSystemInfoSync
} from "../platform";

export const platform = "web";

export const getCanvasContext: IGetCanvasContext = (id: string, ctx?: any) => {
  const canvas = document.getElementById(id) as HTMLCanvasElement;
  if (canvas.getContext) {
    return polyfillContext(canvas.getContext("2d"));
  }
};

export function getCanvasWidthAndHeight(
  ctx: CanvasRenderingContext2D
): {
  width: number;
  height: number;
} {
  const canvas = ctx.canvas;
  return canvas;
}

/**
 * 获取属性
 */
export function getAttrs(obj: any) {
  const attrs: any = {
    style: {}
  };
  let o = obj;
  const keys = [] as string[];
  while (o) {
    keys.push(...Object.getOwnPropertyNames(o));
    o = Object.getPrototypeOf(o);
  }

  const noStyleKeys = ["textContent", "src", "type"];
  keys.forEach(key => {
    if (key.includes("_")) {
      return;
    }

    let value = obj[key];
    const valuetype = typeof value;
    if (!value || ["function", "object"].includes(valuetype)) {
      return;
    }

    if (noStyleKeys.includes(key)) {
      attrs[key] = value;
    } else {
      if (key === "textBaseline" && value === "normal") {
        value = "alphabetic";
      }
      value = addUnit(key, value || "");
      if ("lineClamp" === key) {
        key = `webkitLineClamp`;
        value = Number(value);
      }
      attrs.style[key] = value;
    }
  });

  if (obj.type === "text") {
    attrs.style["webkitBoxOrient"] = "vertical";
    attrs.style["display"] = "-webkit-box";
    attrs.style["overflow"] = "hidden";
  }

  return attrs;
}

function addUnit(key: string, str: string) {
  if (["color", "backgroundColor", "lineClamp"].includes(key)) {
    return str;
  }

  try {
    return `${str}`.replace(getSizeAndUnitReg, (g, $1, $2 = "") => {
      return `${$1}px${$2.includes(" ") ? $2 : ""}`;
    });
  } catch (error) {
    console.error(error);
    return str;
  }
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

  const drawImage = ctx.drawImage.bind(ctx);

  ctx.drawImage = (src: string, ...args: any[]) => {
    const img = new Image();
    img.src = src;
    img.onload = img.onerror = function() {
      drawImage(img, ...args);
    };
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
    Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
      value(callback: any, type: string, quality: number) {
        const canvas = this;
        setTimeout(() => {
          const binStr = atob(canvas.toDataURL(type, quality).split(",")[1]);
          const len = binStr.length;
          const arr = new Uint8Array(len);

          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }

          callback(new Blob([arr], { type: type || "image/png" }));
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
        path: url,
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
