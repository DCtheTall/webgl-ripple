import Scene from './lib/Scene';
import Frame from './lib/Frame';
import Shader from './lib/Shader';
import { Vector2Attribute } from './lib/ShaderAttribute';

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

  const windowShader = new Shader(VERTEX_SHADER, WINDOW_FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', {data: FULL_VIEW_PLANE_VERTICES}),
    aTextureCoord: new Vector2Attribute(
        'a_TextureCoord', {data: FULL_PLANE_VIEW_TEX_COORDS}),
  });
  const windowFrame = new Frame(w, h, 4, windowShader);

  const rippleShader = new Shader(VERTEX_SHADER, RIPPLE_FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', { data: FULL_VIEW_PLANE_VERTICES }),
    aTextureCoord: new Vector2Attribute(
        'a_TextureCoord', { data: FULL_PLANE_VIEW_TEX_COORDS }),
  });
  const rippleFrame1 = new Frame(w, h, 4, rippleShader);
  const rippleFrame2 = new Frame(w, h, 4, rippleShader);

  scene.addRenderFrame('window', windowFrame);
  scene.render(false, () => {
    scene.renderFrameToCanvas('window');
  });
}
