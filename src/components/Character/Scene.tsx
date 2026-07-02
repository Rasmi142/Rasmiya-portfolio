import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import MiyaCharacter from "../MiyaCharacter";
import { setCharTimeline, setAllTimeline } from "../utils/GsapScroll";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";

const GSAPManager = ({ charRef }: { charRef: React.RefObject<THREE.Group> }) => {
  const { camera } = useThree();
  const { setLoading } = useLoading();

  useEffect(() => {
    if (charRef.current) {
      setCharTimeline(charRef.current, camera as THREE.PerspectiveCamera);
      setAllTimeline();

      const progress = setProgress((value) => setLoading(value));
      progress.loaded().then(() => {
        // Any post-load animations if needed
      });
    }
  }, [camera, charRef, setLoading]);

  return null;
};

const CameraSetup = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, -0.5, 0);
  }, [camera]);
  return null;
};

const MouseParallax = ({ children }: { children: React.ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Calculate target rotation based on mouse position
      const targetY = (state.pointer.x * Math.PI) / 8; 
      const targetX = (state.pointer.y * Math.PI) / 12;
      
      // Smoothly interpolate current rotation to target rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetX, 0.05);
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

const Scene = () => {
  const charGroupRef = useRef<THREE.Group>(null);
  
  return (
    <div className="character-container">
      <div className="character-model">
        <Canvas
          shadows
          camera={{ position: [0, 0.5, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <CameraSetup />
          {/* Premium lighting setup matching MiyaPage */}
          <ambientLight intensity={0.5} />
          
          <directionalLight 
            position={[5, 5, 5]} 
            intensity={2} 
            castShadow 
            shadow-mapSize-width={2048} 
            shadow-mapSize-height={2048}
          />
          
          <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffcc00" />
          
          <pointLight position={[0, 3, -5]} intensity={5} color="#ffcc00" />

          <Environment preset="city" />

          <PresentationControls 
            global 
            rotation={[0, 0, 0]} 
            polar={[-0.1, 0.1]} 
            azimuth={[-1, 1]} 
            config={{ mass: 2, tension: 500 }} 
            snap={{ mass: 4, tension: 1500 }}
          >
            <group ref={charGroupRef} position={[0, 7.2, 0]} scale={4.6}>
              <MouseParallax>
                <MiyaCharacter />
              </MouseParallax>
              
              <ContactShadows 
                position={[0, -2, 0]} 
                opacity={0.6} 
                scale={10} 
                blur={2} 
                far={4} 
              />
            </group>
          </PresentationControls>

          <GSAPManager charRef={charGroupRef} />
        </Canvas>
        
        <div className="character-rim"></div>
        <div className="character-hover"></div>
      </div>
    </div>
  );
};

export default Scene;
