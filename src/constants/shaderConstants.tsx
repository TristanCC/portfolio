const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uTime;
  varying vec2 vUv;

  vec3 colorA = vec3(0.149,0.141,0.912);
  vec3 colorB = vec3(1.000,0.833,0.224);
  vec3 colorC = vec3(0.149,1.0,0.912);
  vec3 colorD = vec3(1.000,0.0,1.0);

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
  // Use position and time to shift hue
  float hue = mod(vUv.x + vUv.y + uTime * 0.1, 1.0);
  float sat = .5;
  float val = sin(uTime) *1.0;

  vec3 color = hsv2rgb(vec3(hue, sat, val));
  color = vec3(color);
  float alpha = mix(0., 1.0, 0.5 + 0.5 * sin(uTime));
  gl_FragColor = vec4(color, alpha);
}
`;

export {vertexShader, fragmentShader};