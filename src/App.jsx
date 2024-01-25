import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as Three from "three";

extend({ OrbitControls });

const Controls = () => {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    controls.current.update();
  });
  return (
    <orbitControls ref={controls} args={[camera, gl.domElement]} autoRotate />
  );
};

const particlesGeometry = new Three.BufferGeometry();
const particlesCnt = 50000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
}

particlesGeometry.setAttribute(
  "position",
  new Three.BufferAttribute(posArray, 3)
);

const material = new Three.PointsMaterial({
  size: 0.005,
  color: "white",
});
const SphereMaterial = new Three.PointsMaterial({
  size: 0.05,
  color: "black",
});

const geometry = new Three.SphereGeometry(1, 320, 320);
const sphere = new Three.Points(geometry, SphereMaterial);
const particlesMesh = new Three.Points(particlesGeometry, material);

function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas camera={[1, 1, 5]}>
        <pointLight position={[5, 5, 5]} intensity={0.8} color="blue" />
        <ambientLight intensity={0.2} color={"red"} />
        <Controls />
        <mesh material={SphereMaterial}>
          <primitive object={sphere} />
        </mesh>
        <mesh position={[0, 0, 0]} material={material}>
          <primitive object={particlesMesh} />
        </mesh>
      </Canvas>
    </div>
  );
}

export default App;
