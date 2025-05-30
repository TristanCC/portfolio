"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/constants/shaderConstants";

const ShaderPlane = () => {

    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const meshRef = useRef<THREE.Mesh>(null);
    const { size, viewport } = useThree();  
    // Initialize uniforms with useRef to maintain reference
    const uniforms = useRef({
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uTime: { value: 0.0}
    });

  // Update resolution uniform on resize
    useEffect(() => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        // Simply scale the mesh - no need to recreate geometry
        if (meshRef.current) {
          meshRef.current.scale.set(viewport.width, viewport.height, 1);
        }
      }
    }, [size, viewport]);

    useFrame(({ clock }) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      }
    });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!materialRef.current) return;
    if (e.pointerType === 'mouse') {
        const x = e.clientX / size.width;
        const y = 1 - e.clientY / size.height;
        materialRef.current.uniforms.uMouse.value.set(x, y);
    }
  };



  return (
    <mesh 
      ref={meshRef} 
      onPointerMove={handlePointerMove}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1]} /> {/* Unit plane */}
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        transparent={true}
        
      />
    </mesh>
  );
};

const ThreeScene = () => (
  <Canvas 
   orthographic
   camera={{ zoom: 1, position: [0, 1, 1] , rotation: [0,0,0]}}
   >
    <ShaderPlane />
  </Canvas>
);

export default ThreeScene;
