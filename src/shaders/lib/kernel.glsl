/*

Utility function for applying a convolution with a 3x3 kernel.

*/

float convoluteMatrices(mat3 A, mat3 B) {
  float result = 0;
  for (int i = 0; i < 3; i++) {
    result += dot(A[i], B[i]);
  }
  return result;
}

float applyKernel(sampler2D textureSampler, vec2 textureCoord, vec2 resolution, mat3 kernel) {
  vec2 gradientStep = vec2(1.) / resolution;
  mat3 imgMat;
  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      vec2 ds = vec2(
          -gradientStep.x + (float(i) * gradientStep.x),
          -gradientStep.y + (float(j) * gradientStep.y));
      imgMat[i][j] = texture2D(
          textureSampler, clamp(textureCoord + ds, vec2(0.), vec2(1.))).x;
    }
  }
  return convoluteMatrices(kernel, imgMat);
}

#pragma glslify: export(applyKernel);
