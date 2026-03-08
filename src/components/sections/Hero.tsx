// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import { useRef } from "react";
// import { useGLTF, OrbitControls } from '@react-three/drei';

// function SpinningSphere() {
//   const ballref = useRef();

//   const colorMap = useLoader(TextureLoader, "./image1.jpg");

//   useFrame(() => {
//     ballref.current.rotation.y += 0.003;
//   });

//   return (
//     <mesh ref={ballref}>
//       <sphereGeometry args={[1.5, 64, 64]} />
//       <meshToonMaterial map={colorMap} wireframe={false} side={2}/>
//     </mesh>
//   );
// }

// function Model() {
//   // useGLTF is a simplified hook from drei
//   const { scene } = useGLTF('/path/to/your/model.gltf');

//   return <primitive object={scene} scale={1} position={[0, 0, 0]} />;
// }

// const Hero = () => {
//   return (
//     <div className= "w-full">
//       <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
//         <ambientLight intensity={0.4} />

//         <directionalLight position={[2, 3, 4]} intensity={2} />
//         <SpinningSphere  />
//       </Canvas>
//     </div>
//   );
// };

// export default Hero;

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense } from "react";
import { TextureLoader } from "three";
import { useRef } from "react";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model() {
  // useGLTF is a simplified hook from drei
  const { scene } = useGLTF("./simple-typewriter2.glb");
  return <primitive object={scene} scale={1.25} position={[0, -1, 1]} />;
}
const Hero = () => {
  return (
    <div className=" w-full md:h-[500px] ">
      <Canvas camera={{ position: [10, 10, 10], fov: 45 }}>
        <Environment preset="apartment" />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.25}
          enableDamping
          dollyIn={100}
          enablePan={false}
          target={[0,0,2.5]}
        />
      </Canvas>
    </div>
  );
};
export default Hero;
