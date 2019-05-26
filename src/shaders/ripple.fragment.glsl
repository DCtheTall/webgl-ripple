precision highp float;

varying vec2 v_TextureCoord;

uniform sampler2D u_PreviousFrame0;
uniform sampler2D u_PreviousFrame1;
uniform vec2 u_Resolution;

#pragma glslify: laplacian = require(./lib/laplacian.glsl);

void main() {
  float u0 = texture2D(u_PreviousFrame0, v_TextureCoord).x;
  float u1 = texture2D(u_PreviousFrame1, v_TextureCoord).x;
  float uPrime = (u1 - u0);

  float L = laplacian(u_PreviousFrame1, v_TextureCoord, u_Resolution);
  float damping = 0.0;
  uPrime += L + (damping * uPrime);

  float uFinal = clamp(u1 + uPrime, 0.0, 1.0);
  gl_FragColor = vec4(uFinal, uFinal, uFinal, 1.);
}
