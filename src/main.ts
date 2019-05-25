import Scene from './lib/Scene';
import Frame from './lib/Frame';
import Shader from './lib/Shader';
import { Vector2Attribute } from './lib/ShaderAttribute';

const VERTEX_SHADER = require('./shaders/vertex.glsl') as string;
const FRAGMENT_SHADER = require('./shaders/fragment.glsl') as string;

const FULL_VIEW_PLANE_VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1];
const FULL_PLANE_VIEW_TEX_COORDS = [0, 1, 0, 0, 1, 1, 1, 0];

document.body.onload = function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const w = canvas.width = window.innerWidth;
  const h = canvas.height = window.innerHeight;

  const scene = new Scene(canvas);

  const tmpShader = new Shader(VERTEX_SHADER, FRAGMENT_SHADER, {
    aVertices: new Vector2Attribute(
        'a_Position', {data: FULL_VIEW_PLANE_VERTICES}),
  });
  const tmpFrame = new Frame(w, h, 4, tmpShader)

  scene.addRenderFrame('tmp', tmpFrame);
  scene.render(false, () => {
    scene.renderFrameToCanvas('tmp');
  });
}
