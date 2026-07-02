import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Link } from "react-router-dom";
import MiyaCharacter from "../components/MiyaCharacter";
import "./styles/MiyaPage.css";

const MiyaPage = () => {
  return (
    <div className="miya-page-container">
      <Canvas
        shadows
        camera={{ position: [0, 2, 8], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#0b080c']} />

        {/* Ambient base lighting */}
        <ambientLight intensity={0.5} />
        
        {/* Main Key Light */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={2} 
          castShadow 
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
        />
        
        {/* Soft fill light */}
        <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffcc00" />
        
        {/* Rim Light to highlight character edges */}
        <pointLight position={[0, 3, -5]} intensity={5} color="#ffcc00" />

        {/* Realistic environment reflections */}
        <Environment preset="city" />

        {/* The 3D Model */}
        <MiyaCharacter />

        {/* Soft floor shadow */}
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2} 
          far={4} 
        />

        {/* Interactive Controls */}
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={2} 
          maxDistance={15}
          maxPolarAngle={Math.PI / 2 + 0.1}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
      
      <div className="miya-overlay">
        <Link to="/" className="back-button">← Back to Portfolio</Link>
        <h1>Miya 3D Character</h1>
      </div>
    </div>
  );
};

export default MiyaPage;
