import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Html, useGLTF } from "@react-three/drei";
import styles from "./Viewer.module.css";
import React from "react";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} dispose={null} />;
}

export default function Viewer() {
  const [autoRotate, setAutoRotate] = useState(true);
  return (
    <div className={styles.viewerWrapper}>
      <div className={styles.canvasContainer}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 2.5], fov: 45 }}
          className={styles.canvas}
          gl={{ alpha: true }}
        >
          <Suspense
            fallback={
              <Html center>
                <div className={styles.loader}>Cargando modelo...</div>
              </Html>
            }
          >
            <ambientLight intensity={0.5} />
            <Environment preset="city" background={false} />
            <Model url="/model.glb" />
            <ContactShadows
              position={[0, -0.8, 0]}
              opacity={0.4}
              scale={5}
              blur={2.5}
              far={1.2}
            />
          </Suspense>
          <OrbitControls
            enablePan={false}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            minDistance={1}
            maxDistance={6}
          />
        </Canvas>
      </div>
      <div className={styles.autorotateToggle}>
        <label>
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={() => setAutoRotate((v) => !v)}
          />
          Auto-rotar
        </label>
      </div>
    </div>
  );
}
