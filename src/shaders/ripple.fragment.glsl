precision highp float;

varying vec2 v_TextureCoord;

uniform sampler2D u_PreviousFrame0;
uniform sampler2D u_PreviousFrame1;
uniform vec2 u_Resolution;

const mat3 LAPLACIAN_KERNEL = mat3(
    0.25,  0.5, 0.25,
    0.50, -3.0, 0.50,
    0.25,  0.5, 0.25);

#pragma glslify: applyKernel = require(./lib/kernel.glsl);

void main() {
  float u0 = texture2D(u_PreviousFrame0, v_TextureCoord).x;
  float u1 = texture2D(u_PreviousFrame1, v_TextureCoord).x;

  float L = applyKernel(
      u_PreviousFrame1, v_TextureCoord, u_Resolution, LAPLACIAN_KERNEL);
  float damping = 0.0;

  float uf = 2.0 * u1 - u0 + 0.5 * L;
  uf = 0.05 + 0.9 * uf;
  uf = clamp(uf, 0.0, 1.0);
  gl_FragColor = vec4(vec3(uf), 1.);
}
