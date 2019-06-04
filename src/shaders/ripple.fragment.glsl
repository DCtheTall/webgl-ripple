precision highp float;

varying vec2 v_TextureCoord;

uniform sampler2D u_PreviousFrame;
uniform vec2 u_Resolution;
uniform int u_Input;
uniform vec2 u_MousePosition;

const mat3 LAPLACIAN_KERNEL = mat3(
    0.25,  0.50, 0.25,
    0.50, -3.00, 0.50,
    0.25,  0.50, 0.25);
const float DAMPING = 0.02;
const float DISPLACEMENT_RADIUS = 0.01;

#pragma glslify: applyKernel = require(./lib/kernel.glsl);

void main() {
  float u0 = texture2D(u_PreviousFrame, v_TextureCoord).y;
  float u1 = texture2D(u_PreviousFrame, v_TextureCoord).x;

  float L = applyKernel(
      u_PreviousFrame, v_TextureCoord, u_Resolution, LAPLACIAN_KERNEL);
  float damping = 0.0;

  // Verlet integration step.
  float uf = 2.0 * u1 - u0 + L;

  // Linear damping.
  uf = DAMPING * 0.5 + (1.0 - DAMPING) * uf;

  float displacement = 0.0;
  vec2 ds = (v_TextureCoord - u_MousePosition) * vec2(1.0, u_Resolution.y / u_Resolution.x);
  if (u_Input != 0 && length(ds) <= DISPLACEMENT_RADIUS) {
    displacement -= 1.0;
  }

  gl_FragColor = vec4(
      vec3(clamp(uf + displacement, 0.0, 1.0), u1, 0.0),
      1.0);
}
