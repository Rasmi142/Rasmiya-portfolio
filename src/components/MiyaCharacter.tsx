import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

const MiyaCharacter = () => {
  // Load the GLB file
  const { scene } = useGLTF("/models/Miya.glb");

  // Apply shadows and material properties
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.frustumCulled = true;
          
          if (child.material) {
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  return <primitive object={scene} position={[0, -2, 0]} scale={1.5} />;
};

// Preload to ensure it's loaded efficiently
useGLTF.preload("/models/Miya.glb");

export default MiyaCharacter;
