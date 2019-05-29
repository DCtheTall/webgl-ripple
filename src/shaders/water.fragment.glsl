precision highp float;

varying vec2 v_TextureCoord;

uniform sampler2D u_HeightMap;
uniform sampler2D u_Texture;
uniform vec2 u_Resolution;

const float DEPTH = 10.0;
const float PERTURBANCE = 0.05;
const vec3 VIEW_VECTOR = vec3(0.0, 0.0, -1.0);
const vec3 LIGHT_POSITION = normalize(vec3(4.0, 6.0, 1.0));
const float AMBIENT = 0.9;
const float LAMBERTIAN = 0.4;
const float REFRACTIVE_INDEX = 1.1;

float getWaterHeight(float texHeight) {
  return DEPTH + (2.0 * texHeight - 1.0) * PERTURBANCE;
}

void main() {
  float H = getWaterHeight(texture2D(u_HeightMap, v_TextureCoord).x);

  // Compute normal.
  vec2 ds = vec2(10.0) / u_Resolution;
  float Hx = getWaterHeight(
      texture2D(u_HeightMap, v_TextureCoord + vec2(ds.x, 0.0)).x);
  vec3 dx = vec3(ds.x, 0.0, Hx - H);
  float Hy = getWaterHeight(
      texture2D(u_HeightMap, v_TextureCoord + vec2(0.0, ds.y)).x);
  vec3 dy = vec3(0.0, ds.y, Hy - H);
  vec3 normal = normalize(cross(dx, dy));

  vec2 transformedTexCoord;
  if (normal == VIEW_VECTOR) {
    transformedTexCoord = v_TextureCoord;
  } else {
    vec3 axial = normalize(normal - VIEW_VECTOR);
    float sine = length(cross(normal, VIEW_VECTOR));
    sine *= REFRACTIVE_INDEX;
    float tang = tan(asin(sine));
    vec3 displacement = normalize(vec3(tang * H * axial.xy, H)) / 10.0;
    transformedTexCoord = v_TextureCoord + displacement.xy;
  }

  // Lighting.
  float lambertian = dot(normal, LIGHT_POSITION);
  float lighting = AMBIENT;
  lighting +=  dot(normal, LIGHT_POSITION) * LAMBERTIAN;
  float specular = pow(dot(normal, LIGHT_POSITION), 200.0);

  gl_FragColor = texture2D(u_Texture, transformedTexCoord) * lighting + specular;
}
