import Scene from './lib/Scene';
import Frame from './lib/Frame';
import Shader from './lib/Shader';
import { Vector2Attribute } from './lib/ShaderAttribute';
import { IntegerUniform, ShaderUniform, Vector2Uniform } from './lib/ShaderUniform';

const VERTEX_SHADER = require('./shaders/vertex.glsl') as string;
const RIPPLE_FRAGMENT_SHADER =
    require('./shaders/ripple.fragment.glsl') as string;
const WINDOW_FRAGMENT_SHADER =
    require('./shaders/window.fragment.glsl') as string;

const FULL_VIEW_PLANE_VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1];
const FULL_PLANE_VIEW_TEX_COORDS = [0, 1, 0, 0, 1, 1, 1, 0];

function initCanvasWithNormalDistribution() {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const mu = [w, h].map((x) => Math.round(x / 2));
  const sigma = 5;

  for (let x = 0; x < w; x++)
  for (let y = 0; y < h; y++) {
    let u = ((x - mu[0]) ** 2) + ((y - mu[1]) ** 2);
    u /= (sigma ** 2);
    u = Math.exp(-u);
    if (u < 1e-4) u = 0;
    u = (0.5 * u) + 0.5;
    u *= 255;
    ctx.fillStyle = `rgba(${u},${u},${u},1)`;
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
  });
  for (let i = 0; i < 3; i++) {
    scene.addRenderFrame(`ripple${i}`, new Frame(w, h, 4, rippleShader));
  }

  const windowShader = new Shader(VERTEX_SHADER, WINDOW_FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', {data: FULL_VIEW_PLANE_VERTICES}),
    aTextureCoord: new Vector2Attribute(
        'a_TextureCoord', {data: FULL_PLANE_VIEW_TEX_COORDS}),
  }, {
    uCurrentFrame: new IntegerUniform('u_CurrentFrame', {data: 0}),
  });
  scene.addRenderFrame('window', new Frame(w, h, 4, windowShader));

  scene.addTexture('normal_dist', initCanvasWithNormalDistribution());

  let epoch = 0;
  scene.render(true, () => {
    switch (epoch++) {
      case 0:
        scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE0);
        scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('ripple0', WebGLRenderingContext.TEXTURE0);
      case 1:
        scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE0);
        scene.bindFrameToTexture('ripple0', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('ripple1', WebGLRenderingContext.TEXTURE0);
      default:
        scene.bindFrameToTexture('ripple0', WebGLRenderingContext.TEXTURE0);
        scene.bindFrameToTexture('ripple1', WebGLRenderingContext.TEXTURE1);
        scene.renderFrameAsTexture('ripple2', WebGLRenderingContext.TEXTURE0);

        const tmp = scene.getRenderFrame('ripple0');
        scene.setRenderFrame('ripple0', scene.getRenderFrame('ripple1'));
        scene.setRenderFrame('ripple1', scene.getRenderFrame('ripple2'));
        scene.setRenderFrame('ripple2', tmp);
        break;
    }
    scene.renderFrameToCanvas('window');
  });
}
