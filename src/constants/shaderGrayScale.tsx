const vertexShader = `
   varying vec2 vUv;
   void main() {
     vUv = uv;
     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
   }
 `;

const fragmentShader = `
precision highp float;

uniform vec2 uMouse;        // [-1,1]
uniform vec2 uResolution;
uniform float uTime;

varying vec2 vUv;

/* =======================
   Simplex Noise (2D)
   ======================= */
vec3 permute(vec3 x) { 
  return mod(((x * 34.0) + 1.0) * x, 289.0); 
}

float snoise(vec2 v){
  const vec4 C = vec4(
    0.211324865405187,
    0.366025403784439,
   -0.577350269189626,
    0.024390243902439
  );

  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);

  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;

  i = mod(i, 289.0);
  vec3 p = permute(
    permute(i.y + vec3(0.0, i1.y, 1.0)) +
    i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
    0.5 - vec3(
      dot(x0, x0),
      dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)
    ),
    0.0
  );

  m *= m;
  m *= m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;

  m *= 1.79284291400159 - 0.85373472095314 *
       (a0 * a0 + h * h);

  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;

  return 33.0 * dot(m, g);
}

void main() {

  /* =======================
     Normalized coordinates
     ======================= */
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;

  vec2 p = uv;
  p.x *= aspect;

  /* =======================
     Low-frequency noise
     ======================= */
  float scale = 1.5;
  vec2 nUV = p * scale + vec2(uTime * 0.05);

  float n = snoise(nUV);

  // Band-limit noise
  n = smoothstep(-0.4, 0.4, n);
  n *= 0.35;

  /* =======================
     Greyscale gradient field
     ======================= */
  // Use the same spatial formula as the hue calculation
  float gradient = fract(p.x * 0.4 + p.y * 0.4 + n + uTime * .07);
  
  // Map to greyscale range with similar contrast
  float grey = mix(0.3, 0.9, gradient);

  vec3 color = vec3(grey);

  /* =======================
     Mouse highlight
     ======================= */
  vec2 mouse = uMouse;
  vec2 frag = (vUv - 0.5) * vec2(aspect, 1.0) * 2.0;
  vec2 mpos = mouse * vec2(aspect, 1.0);

  float dist = distance(frag, mpos);

  // Influence radius
  float r = 0.35;

  // Smooth influence
  float influence = smoothstep(r, 0.0, dist);

  // Shift gradient locally (equivalent to hue shift)
  float gradientShift = influence * 0.18;

  // Increase contrast under cursor (equivalent to saturation boost)
  float contrastBoost = influence * 0.25;

  // Apply interaction
  gradient = fract(gradient + gradientShift);
  grey = mix(0.0, 1.0, gradient);
  
  // Boost contrast by pushing away from mid-grey
  grey = mix(grey, grey + (grey - 0.6) * contrastBoost, contrastBoost);
  grey = clamp(grey, 0.0, 1.0);

  // Recompute color
  color = vec3(grey);


  /* =======================
     Output
     ======================= */
  gl_FragColor = vec4(color, 1.0);
}
`;

export {vertexShader, fragmentShader};