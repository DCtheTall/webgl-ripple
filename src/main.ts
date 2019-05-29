import Scene from './lib/Scene';
import Frame from './lib/Frame';
import Shader from './lib/Shader';
import { Vector2Attribute } from './lib/ShaderAttribute';
import { IntegerUniform, Vector2Uniform } from './lib/ShaderUniform';

const VERTEX_SHADER = require('./shaders/vertex.glsl') as string;
const RIPPLE_FRAGMENT_SHADER =
    require('./shaders/ripple.fragment.glsl') as string;
const WINDOW_FRAGMENT_SHADER =
    require('./shaders/window.fragment.glsl') as string;
const WATER_FRAGMENT_SHADER =
    require('./shaders/water.fragment.glsl') as string;

const FULL_VIEW_PLANE_VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1];
const FULL_PLANE_VIEW_TEX_COORDS = [0, 1, 0, 0, 1, 1, 1, 0];

function onMouseMove(event: MouseEvent, callback: (x: number, y: number) => void) {
  const x = event.clientX / window.innerWidth;
  const y = (window.innerHeight - event.clientY) / window.innerHeight;
  callback(x, y);
}

function initCanvas() {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  ctx.fillStyle = 'rgba(122.5, 122.5, 122.5, 1)';
  for (let x = 0; x < w; x++)
  for (let y = 0; y < h; y++) {
    ctx.fillRect(x, y, 1, 1);
  }

  return canvas;
}

document.body.onload = function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;

  const scene = new Scene(canvas);

  const rippleShader = new Shader(VERTEX_SHADER, RIPPLE_FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', {data: FULL_VIEW_PLANE_VERTICES}),
    aTextureCoord: new Vector2Attribute(
        'a_TextureCoord', {data: FULL_PLANE_VIEW_TEX_COORDS}),
  }, {
    uPreviousFrame0: new IntegerUniform('u_PreviousFrame0', {data: 0}),
    uPreviousFrame1: new IntegerUniform('u_PreviousFrame1', {data: 1}),
    uResolution: new Vector2Uniform('u_Resolution', {data: [w, h]}),
    uInput: new IntegerUniform('u_Input', {data: 0}),
    uMousePosition: new Vector2Uniform('u_MousePosition', {data: [0, 0]}),
  });
  for (let i = 0; i < 3; i++) {
    scene.addFrame(`ripple${i}`, new Frame(w, h, 4, rippleShader));
  }

  const waterShader = new Shader(VERTEX_SHADER, WATER_FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', {data: FULL_VIEW_PLANE_VERTICES}),
    aTextureCoord: new Vector2Attribute(
        'a_TextureCoord', {data: FULL_PLANE_VIEW_TEX_COORDS}),
  }, {
    uHeightMap: new IntegerUniform('u_HeightMap', {data: 0}),
    uTexture: new IntegerUniform('u_Texture', {data: 1}),
    uResolution: new Vector2Uniform('u_Resolution', {data: [w, h]}),
  });
  scene.addFrame('water', new Frame(w, h, 4, waterShader));

  const windowShader = new Shader(VERTEX_SHADER, WINDOW_FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', {data: FULL_VIEW_PLANE_VERTICES}),
    aTextureCoord: new Vector2Attribute(
        'a_TextureCoord', {data: FULL_PLANE_VIEW_TEX_COORDS}),
  }, {
    uCurrentFrame: new IntegerUniform('u_CurrentFrame', {data: 0}),
  });
  scene.addFrame('window', new Frame(w, h, 4, windowShader));

  scene.addTexture('normal_dist', initCanvas());
  scene.addTexture(
      'pond', document.getElementById('pond-img') as HTMLImageElement);

  document.addEventListener(
      'mousemove',
      (ev) => onMouseMove(ev, (x: number, y: number) => {
        scene.getFrame('ripple2').shader.setUniformData('uInput', 1);
        scene.getFrame('ripple2').shader.setUniformData('uMousePosition', [x, y]);
      }));
  document.addEventListener('mousedown', () => scene.toggleAnimation());

  let epoch = 0;
  scene.render(true, () => {
    switch (epoch++) {
      case 0:
        scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE0);
        scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('ripple0', WebGLRenderingContext.TEXTURE0);
        scene.bindTexture('pond', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('water', WebGLRenderingContext.TEXTURE0);
        break;

      case 1:
        scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE0);
        scene.bindFrameToTexture('ripple0', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('ripple1', WebGLRenderingContext.TEXTURE0);
        scene.bindTexture('pond', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('water', WebGLRenderingContext.TEXTURE0);
        break;

      default:
        scene.bindFrameToTexture('ripple0', WebGLRenderingContext.TEXTURE0);
        scene.bindFrameToTexture('ripple1', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('ripple2', WebGLRenderingContext.TEXTURE0);
        scene.bindTexture('pond', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('water', WebGLRenderingContext.TEXTURE0);

        const tmp = scene.getFrame('ripple0');
        scene.setFrame('ripple0', scene.getFrame('ripple1'));
        scene.setFrame('ripple1', scene.getFrame('ripple2'));
        scene.setFrame('ripple2', tmp);
        break;
    }
    scene.renderFrameToCanvas('window');
  });
}
