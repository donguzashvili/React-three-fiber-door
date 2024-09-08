import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model, { ModelRef } from "./model/Model";

const App = () => {
  const modelRef = useRef<ModelRef>(null!);
  const [toggle, setToggle] = useState<boolean>(false);
  const resetAnimation = () => {
    if (!modelRef.current) return;
    modelRef.current.ResetAnimation();
  };

  const startAnimation = () => {
    if (!modelRef.current) return;
    modelRef.current.StartAnimation();
  };

  useEffect(() => {
    if (toggle) startAnimation();
    else resetAnimation();
  }, [toggle]);

  return (
    <Canvas
      style={{ height: "100vh", width: "100vw" }}
      onClick={() => setToggle((prev) => !prev)}
    >
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />

      <Model ref={modelRef} />

      {/* Controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default App;
