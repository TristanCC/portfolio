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
   HSV → RGB
   ======================= */
vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

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
     HSV color field
     ======================= */
  float hue = fract(p.x * 0.4 + p.y * 0.4 + n + uTime * 0.05);
  float sat = 0.55;
  float val = 0.75;

  vec3 color = hsv2rgb(vec3(hue, sat, val));

  /* =======================
     Mouse highlight
     ======================= */
// --- Mouse interaction in field space ---
vec2 mouse = uMouse;
vec2 frag = (vUv - 0.5) * vec2(aspect, 1.0) * 2.0;
vec2 mpos = mouse * vec2(aspect, 1.0);

float dist = distance(frag, mpos);

// Influence radius
float r = 0.35;

// Smooth influence
float influence = smoothstep(r, 0.0, dist);

// Rotate hue locally
float hueShift = influence * 0.18;

// Increase saturation slightly under cursor
float satBoost = influence * 0.25;

// Apply interaction
hue = fract(hue + hueShift);
sat = clamp(sat + satBoost, 0.0, 1.0);

// Recompute color
color = hsv2rgb(vec3(hue, sat, val));
  /* =======================
     Soft scanlines (stable)
     ======================= */
  float scan = sin(gl_FragCoord.y * 1.25) * 0.03;
  color -= scan;

  /* =======================
     Output
     ======================= */
  gl_FragColor = vec4(color, 1.0);
}
`;

 export {vertexShader, fragmentShader};



// MOUSE TRACKING

//void main() {
//  // Mouse visualization - red/green based on mouse position
//  vec2 mouse = (uMouse +1.) * 0.5; // Convert from [-1,1] to [0,1]
//  mouse = vec2(mouse.x, -mouse.y + 1.);
//  // Create a circle that follows the mouse
//  float dist = distance(vUv, mouse);
//  float circle = smoothstep(0.1, 0.05, dist);
//  
//  // Mix between a color and the circle
//  vec3 color = mix(vec3(vUv, 0.5), vec3(1.0, 1.0, 0.0), circle);
//  
//  gl_FragColor = vec4(color, 1.0);
//}





//  float val = sin(uTime) *1.0;


// Vertex Shader - Simple version with displacement
// const vertexShader = `
//   varying vec2 vUv;
//   uniform float uTime;
  
//   void main() {
//     vUv = uv;
    
//     // Create simple swirl displacement
//     float swirl = sin(uTime * 0.5 + position.x * 10.0) * 0.1;
//     float newSwirl = cos(uTime * 0.5 + position.y * 10.0) * 0.1;
//     swirl = mix(swirl, newSwirl,.5);
    
//     // Apply displacement to the position
//     vec3 newPosition = position;
//     newPosition.x += swirl;
//     newPosition.y += swirl;
    
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
//   }
// `;

// // Fragment Shader - Colorful swirling pattern
// const fragmentShader = `
//   uniform float uTime;
//   varying vec2 vUv;

//   float rand(vec2 n) { 
// 	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
// }

// float noise(vec2 p){
// 	vec2 ip = floor(p);
// 	vec2 u = fract(p);
// 	u = u*u*(3.0-2.0*u);
	
// 	float res = mix(
// 		mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
// 		mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
// 	return res*res;
// }

//   void main() {
//     // Create swirling pattern coordinates
//     vec2 center = vUv - 0.5; // Move center to middle
//     float angle = atan(center.y, center.x); // Get angle from center
//     float radius = length(center); // Distance from center
    
//     // Create the swirl effect
//     float swirl = sin(angle * 5.0 + radius * 20.0 - uTime * 2.0);
    
//     // Make colorful version
//     vec3 color;
//     color.r = swirl * 0.5 + 0.5;
//     color.g = sin(swirl * 3.14 + 1.0) * 0.5 + 0.5;
//     color.b = cos(swirl * 6.28 + 2.0) * 0.5 + 0.5;
    
//     gl_FragColor = vec4(color, 1.0);
//   }
// `;

// export { vertexShader, fragmentShader };