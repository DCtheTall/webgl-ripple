precision mediump float;

attribute vec2 a_Position;
attribute vec2 a_TextureCoord;

varying vec2 v_TextureCoord;

void main() {
  gl_Position = vec4(a_Position, 0., 1.);
  v_TextureCoord = a_TextureCoord;
}
