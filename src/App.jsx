import Viewer from "./components/Viewer";
import styles from "./App.module.css";
import React from "react";

export default function App() {
  return (
    <div className={styles.appBg}>
      <main className={styles.main}>
        <h1 className={styles.title}>3D Model Viewer</h1>
        <Viewer />
        <footer className={styles.footer}>
          <span>Creado con ❤️ usando React, Three.js y Blender · © {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}
