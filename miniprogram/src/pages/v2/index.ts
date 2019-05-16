import MC, { html } from 'miniapp-canvas';

Page({
  data: {
    width: 300,
    height: 300
  },
  onLoad() {
    const mc = new MC('canvas-id');
    const result = html`
      <m-rect width="100" height="100" backgroundColor="#f0f"></m-rect>
      <m-image
        src="https://avatars1.githubusercontent.com/u/4362412?s=40&v=4"
        width="60"
        height="60"
        left="50"
        top="90"
        borderRadius="6"
      ></m-image>
      <m-text text="wo shi m-text"></m-text>
      <m-qrcode top="100" width="100" height="100" content="https://baidu.com/"/>
    `;
    mc.loadHtm(result);
    mc.draw();
  }
});
