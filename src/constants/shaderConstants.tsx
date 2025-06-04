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

  vec3 colorA = vec3(0.149, 0.141, 0.912);
  vec3 colorB = vec3(1.000, 0.833, 0.224);
  vec3 colorC = vec3(0.149, 1.0, 0.912);
  vec3 colorD = vec3(1.000, 0.0, 1.0);

  float warp = 0.;
  float scan = 0.3;

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 33.0 * dot(m, g);
  }

  float noise(vec2 seed)
  {
    float x = (seed.x / 3.14159 + 4.0) * (seed.y / 13.0 + 4.0) * ((fract(uTime) + 1.0) * 10.0);
    return mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01) - 0.005;
  }

  void main() {
    // --- Aspect-corrected UV ---
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 centerUV = uv;

    // --- CRT Warp Effect ---
    vec2 dc = abs(0.5 - uv);
    dc *= dc;

    uv.x -= 0.5; uv.x *= 1.0 + (dc.y * (0.3 * warp)); uv.x += 0.5;
    uv.y -= 0.5; uv.y *= 1.0 + (dc.x * (0.4 * warp)); uv.y += 0.5;

    // If out of bounds after warp, return black
    if (uv.y > 1.0 || uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }

    // --- Procedural color generation ---
    float scale = 2.0;
    float aspect = uResolution.x / uResolution.y;
    vec2 procUV = centerUV; // use unwarped UV for coloring
    procUV.x *= aspect;

    vec2 noiseUV = procUV * scale + vec2(uTime * 0.1);

    float colorNoise = snoise(noiseUV);
    float alphaNoise = noise(noiseUV * 2.0);

    float hue = procUV.x + procUV.y + colorNoise * 0.9 + uTime * 0.1;
    float sat = 0.5;
    float val = mix(0.5, 0.8, clamp(colorNoise, 0.5, 1.0));

    vec3 color = hsv2rgb(vec3(-hue + alphaNoise * 25., -sat, val));

    // --- CRT Scanline Effect ---
    float scanline = abs(sin(gl_FragCoord.y) * 0.5 * scan);
    color = mix(color, vec3(0.0), scanline);


    // --- Mouse Movement ---
    vec2 mouse = uMouse; // Already in [-1,1] range
  
    // Convert to normalized coordinates [-1,1]
    vec2 fragCoord = (vUv - 0.5) * 2.0;
  
    // OPTION 1: Stretch horizontal axis (recommended for most cases)
    vec2 aspectCorrectedFrag = fragCoord * vec2(aspect, 1.0);
    vec2 aspectCorrectedMouse = mouse * vec2(aspect, 1.0);
  
    // OPTION 2: Squash vertical axis (alternative approach)
    // vec2 aspectCorrectedFrag = fragCoord * vec2(1.0, 1.0/aspect);
    // vec2 aspectCorrectedMouse = mouse * vec2(1.0, 1.0/aspect);
  
    // Calculate distance in aspect-corrected space
    float dist = distance(aspectCorrectedFrag, aspectCorrectedMouse);
  
    // Create circle with smooth edges
    float circleRadius = 0.2;
    float edgeSoftness = 0.05;
    float circle = smoothstep(circleRadius + edgeSoftness, circleRadius - edgeSoftness, dist);
  
    // Apply circle effect (yellow highlight)
    vec3 mouseColor = mix(color, color+.1, circle);

    float alpha = mix(0.9, 1.0, sin(uTime + alphaNoise * 50.0) * 0.5 + 0.5);
    gl_FragColor = vec4(mouseColor, alpha);
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