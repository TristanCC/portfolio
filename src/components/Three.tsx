"use client";
//Three.tsx
import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "@/constants/shaderConstants";
import { Stats } from "@react-three/drei";

const ShaderPlane = React.memo(({ mouseRef }) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, viewport } = useThree();

  const uniforms = useRef({
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTime: { value: 0.0 }
  });

  // Update resolution and scale when size changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uResolution.value.set(size.width * 2, size.height * 2);
    }
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [size, viewport]);


  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      materialRef.current.uniforms.uMouse.value.copy(mouseRef.current);
    }
  });



  return (
    <mesh 
      ref={meshRef} 
    >
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
      />
    </mesh>
  );
})

const ThreeScene = () => {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

useEffect(() => {
  let rafId: number;
  
  const handleMouseMove = (e: MouseEvent) => {
    if (rafId) return; // Skip if frame already requested
    
    rafId = requestAnimationFrame(() => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x, y);
      rafId = 0;
    });
  };

  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    if (rafId) cancelAnimationFrame(rafId);
  };
}, []);

  return (

      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 1]}}
      
      className="">
        <ShaderPlane passRef={materialRef} mouseRef={mouseRef} />
        {//<Stats/>
        }
      </Canvas>

  );
};
  
export default ThreeScene;
