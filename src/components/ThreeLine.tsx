"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/constants/shaderConstants";

const ShaderPlane = () => {
  const materialRef1 = useRef<THREE.ShaderMaterial>(null);
  const materialRef2 = useRef<THREE.ShaderMaterial>(null);
  const meshRef1 = useRef<THREE.Mesh>(null);
  const meshRef2 = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();
  
  // Initialize uniforms with useRef to maintain reference
  const uniforms1 = useRef({
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTime: { value: 0.0 }
  });

  const uniforms2 = useRef({
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTime: { value: 0.0 }
  });

  // Animation state
  const animationState = useRef({
    baseScale: 1,
    pulseScale: 1,
    pulseSpeed: 1.5,
    pulseAmount: 0.2,
    rotationSpeed: 0.5,
    rotationIntensity: 1.0,
    distortionSpeed: 1.0,
    distortionAmount: 0.3
  });

  const calculateBaseScale = () => {
    const baseSize = 1.5;
    const minScale = 0.5;
    const maxScale = 2.5;
    let scaleFactor = baseSize / viewport.width;
    return Math.max(minScale, Math.min(maxScale, scaleFactor * 1000));
  };

  useEffect(() => {
    if (materialRef1.current) {
      materialRef1.current.uniforms.uResolution.value.set(size.width, size.height);
    }
    if (materialRef2.current) {
      materialRef2.current.uniforms.uResolution.value.set(size.width, size.height);
    }
    animationState.current.baseScale = calculateBaseScale();
  }, [size, viewport]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const { 
      baseScale, 
      pulseSpeed, 
      pulseAmount,
      rotationSpeed,
      rotationIntensity,
      distortionSpeed,
      distortionAmount
    } = animationState.current;
    
    const pulseFactor = 1 + Math.sin(elapsedTime * pulseSpeed) * pulseAmount;
    const currentScale = baseScale * pulseFactor;
    
    // Update uniforms for both materials
    if (materialRef1.current) materialRef1.current.uniforms.uTime.value = elapsedTime;
    if (materialRef2.current) materialRef2.current.uniforms.uTime.value = elapsedTime;
    
    // Update mesh1 transformations
    if (meshRef1.current) {
      meshRef1.current.scale.set(
        currentScale,
        currentScale * (1 + Math.sin(elapsedTime * distortionSpeed) * distortionAmount),
        currentScale * (1 + Math.cos(elapsedTime * distortionSpeed * 1.3) * distortionAmount)
      );
      meshRef1.current.rotation.set(
        Math.sin(elapsedTime * rotationSpeed * 0.3) * rotationIntensity,
        elapsedTime * rotationSpeed,
        Math.cos(elapsedTime * rotationSpeed * 0.7) * rotationIntensity
      );
    }
    
    // Update mesh2 transformations (with different parameters for variety)
    if (meshRef2.current) {
      meshRef2.current.scale.set(
        currentScale * 0.8, // Slightly smaller
        currentScale * 0.8 * (1 + Math.cos(elapsedTime * distortionSpeed * 0.7) * distortionAmount),
        currentScale * 0.8 * (1 + Math.sin(elapsedTime * distortionSpeed * 1.1) * distortionAmount)
      );
      meshRef2.current.rotation.set(
        Math.cos(elapsedTime * rotationSpeed * 0.5) * rotationIntensity,
        -elapsedTime * rotationSpeed * 0.7, // Rotate in opposite direction
        Math.sin(elapsedTime * rotationSpeed * 0.9) * rotationIntensity
      );
    }
  });

  const handlePointerMove = (e: React.PointerEvent) => {
    const x = e.clientX / size.width;
    const y = 1 - e.clientY / size.height;
    
    if (materialRef1.current) materialRef1.current.uniforms.uMouse.value.set(x, y);
    if (materialRef2.current) materialRef2.current.uniforms.uMouse.value.set(x, y);
  };

  return (
    <>
      <mesh 
        ref={meshRef1} 
        onPointerMove={handlePointerMove}
        position={[0, 0, 0]}
      >
        < planeGeometry args={[1, 0.01, 20, 100]} />
        <shaderMaterial
          ref={materialRef1}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms1.current}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      <mesh 
        ref={meshRef2} 
        onPointerMove={handlePointerMove}
        position={[0, 0, 0.1]} // Slightly offset in Z-axis to prevent z-fighting
      >
        <sphereGeometry args={[1]} /> {/* Slightly larger radius */}
        <shaderMaterial
          ref={materialRef2}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms2.current}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

const ThreeScene = () => (
  <Canvas 
    orthographic
    camera={{ 
      zoom: 100, 
      position: [0, 0, 5],
      near: 0.1,
      far: 1000
    }}
    style={{
      width: '100%',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0
    }}
  >
    <ShaderPlane />
  </Canvas>
);

export default ThreeScene;