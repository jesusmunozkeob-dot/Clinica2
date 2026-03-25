import { Suspense, useState, useRef } from "react";
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
  const viewerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    const elem = viewerRef.current;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Detectar cambios de pantalla completa para actualizar el estado
  React.useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <div className={styles.viewerWrapper} ref={viewerRef}>
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
            enablePan={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
            minDistance={1}
            maxDistance={100}
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
        <button
          className={styles.fullscreenBtn}
          onClick={handleFullscreen}
          style={{ marginLeft: '1rem', padding: '0.3rem 1rem', borderRadius: '0.7rem', border: 'none', background: '#222', color: '#fff', cursor: 'pointer' }}
        >
          {isFullscreen ? 'Salir pantalla completa' : 'Pantalla completa'}
        </button>
      </div>
    </div>
  );
}
