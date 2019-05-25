precision highp float;

precision mediump float;

attribute vec2

varying vec2 v_TextureCoord;

uniform sampler2D u_PreviousFrame;

void main() {
  gl_FragColor = vec4(1., 0., 0., 1.);
}
