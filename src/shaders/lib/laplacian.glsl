const mat3 LAPLACIAN_KERNEL = mat3(
    0.25,  0.5, 0.25,
    0.50, -3.0, 0.50,
    0.25,  0.5, 0.25);

float convoluteMatrices(mat3 A, mat3 B) {
  return dot(A[0], B[0]) + dot(A[1], B[1]) + dot(A[2], B[2]);
}

float laplacian(sampler2D textureSampler, vec2 textureCoord, vec2 resolution) {
  vec2 gradientStep = vec2(1.) / resolution;
  mat3 imgMat = mat3(0.);

  for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
      vec2 ds = vec2(
          -gradientStep.x + (float(i) * gradientStep.x),
          -gradientStep.y + (float(j) * gradientStep.y));
      imgMat[i][j] = texture2D(
          textureSampler, clamp(textureCoord + ds, vec2(0.), vec2(1.))).x;
    }
  }

  return convoluteMatrices(LAPLACIAN_KERNEL, imgMat);
}

#pragma glslify: export(laplacian);
