export interface IGetCanvasContext {
  (id: string, ctx?: any): any;
}

export interface ICanvasToTempFilePath {
  (canvasId: string, ctx?: any): Promise<{ tempFilePath: string }>;
}

export interface IGetImageInfo {
  (url: string): Promise<{
    path: any;
    width: number;
    height: number;
  }>;
}

export interface IGetSystemInfoSync {
  (): {
    windowWidth: number;
    windowHeight: number;
    screenWidth: number;
    screenHeight: number;
  };
}
