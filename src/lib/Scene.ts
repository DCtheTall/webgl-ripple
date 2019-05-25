import Frame from './Frame';

const CLEAR_COLOR = [0, 0, 0, 1];

function isPowerOfTwo(n: number): boolean {
  return (n & (n - 1)) === 0;
}

export default class Scene {
  private gl: WebGLRenderingContext;

  private readonly frames: Map<string, Frame>;

  constructor(canvas: HTMLCanvasElement) {
    this.gl =
        canvas.getContext('webgl', {preserveDrawingBuffer: true}) ||
        canvas.getContext('experimental-webgl', {preserveDrawingBuffer: true});
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.frames = new Map();
  }

  public addRenderFrame(key: string, frame: Frame) {
    frame.init(this.gl);
    this.frames.set(key, frame);
  }

  public getRenderFrame(key: string): Frame {
    if (!this.frames.has('key')) {
      throw new Error(`Scene has not frame labeled: ${key}`);
    }
    return this.frames.get(key);
  }

  public setRenderFrame(key: string, frame: Frame) {
    this.frames.set(key, frame);
  }

  private renderFrame(
      frame: Frame, frameBuffer: WebGLFramebuffer,
      renderBuffer: WebGLRenderbuffer) {
    this.gl.useProgram(frame.shader.getProgram());
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer);
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, renderBuffer);
    if (frame.clearBeforeRender) {
      this.gl.clearColor.apply(this.gl, CLEAR_COLOR);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    this.gl.viewport(0, 0, frame.width, frame.height);
    frame.shader.sendAttributes(this.gl);
    frame.shader.sendUniforms(this.gl);
    if (frame.drawElements) {
      this.gl.drawElements(
          frame.mode, frame.nVertices, this.gl.UNSIGNED_SHORT, 0);
    } else {
      this.gl.drawArrays(
          this.gl.TRIANGLE_STRIP, 0, frame.nVertices);
    }
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
  }

  public renderFrameAsTexture(key: string, activeTextureNumber: number) {
    const frame = this.frames.get(key);
    this.renderFrame(frame, frame.getFrameBuffer(), frame.getRenderBuffer());
    this.gl.activeTexture(activeTextureNumber);
    this.gl.bindTexture(this.gl.TEXTURE_2D, frame.getTexture());
  }

  public renderFrameToCanvas(key: string) {
    const frame = this.frames.get(key);
    this.renderFrame(frame, null, null);
  }
}
