
"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/constants/shaderConstants";
import { Stats, OrbitControls } from '@react-three/drei'

const ShaderPlane = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();

  const uniforms = useRef({
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTime: { value: 0.0 }
  });

  // Set initial resolution and mesh scale
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
    }

    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width*2, viewport.height*2, 1);
    }
  }, [size, viewport]);

  // Animate scale to pulse while keeping it fullscreen
  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const time = clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    // const pulse = 1 + Math.sin(time * pulseSpeed) * pulseAmount;
    // meshRef.current.scale.set(
    //   viewport.width * pulse,
    //   viewport.height * pulse,
    //   1
    // );
  });

  meshRef.current?.lookAt(new THREE.Vector3(1,1,1))

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!materialRef.current) return;
    if (e.pointerType === 'mouse') {
      const x = e.clientX / size.width;
      const y = 1 - e.clientY / size.height;
      materialRef.current.uniforms.uMouse.value.set(x, y);
    }
  };

  return (
    <mesh ref={meshRef} onPointerMove={handlePointerMove}>
      <planeGeometry args={[1, 1, 50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent={false}
      />
    </mesh>
  );
};


const ThreeScene = () => (
  <Canvas
    className="absolute inset-0 -z-20"
    orthographic 
    camera={{ 
      zoom: 100, 
      position: [2, 2, 2],
      
      
    }}

    

  >
    <ShaderPlane />
        {/* <axesHelper args={[3]} />
        <Stats /> */}

  </Canvas>
);

export default ThreeScene;