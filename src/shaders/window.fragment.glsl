precision highp float;

precision mediump float;

varying vec2 v_TextureCoord;

uniform sampler2D u_CurrentFrame;

void main() {
  gl_FragColor = texture2D(u_CurrentFrame, v_TextureCoord);
}

