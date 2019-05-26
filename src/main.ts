import Scene from './lib/Scene';
import Frame from './lib/Frame';
import Shader from './lib/Shader';
import { Vector2Attribute } from './lib/ShaderAttribute';
import { IntegerUniform, ShaderUniform } from './lib/ShaderUniform';

const VERTEX_SHADER = require('./shaders/vertex.glsl') as string;
const RIPPLE_FRAGMENT_SHADER = require('./shaders/ripple.fragment.glsl')
const WINDOW_FRAGMENT_SHADER =
    require('./shaders/window.fragment.glsl') as string;

const FULL_VIEW_PLANE_VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1];
const FULL_PLANE_VIEW_TEX_COORDS = [0, 1, 0, 0, 1, 1, 1, 0];

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

  scene.render(false, () => {
    scene.renderFrameAsTexture('ripple0', WebGLRenderingContext.TEXTURE0);
    scene.renderFrameToCanvas('window');
  });
}
