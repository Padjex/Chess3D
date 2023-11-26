import Experience from "./Experience";
import LoadingScreen from "./components/LoadnigScreen";
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import useGame from "./store/useGame";
import Interface from "./components/interface/Interface";
import { AnimatePresence } from "framer-motion";
import ControlsButtons from "./components/interface/ControlButtons";
import Console from "./components/interface/Console";

function App() {
  const ready = useGame((state) => state.loaded);
  const started = useGame((state) => state.started);

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (started) {
      const timer = setTimeout(() => {
        setStart(true);
      }, 900);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [started]);

  return (
    <>
      {!start && <LoadingScreen />}
      {start && <Interface />}
      {start && <ControlsButtons />}
      {start && <Console />}

      <Canvas
        // flat
        // orthographic={true}
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [0, 1, -8],
        }}
        shadows
      >
        <Suspense>{ready && <Experience />}</Suspense>
      </Canvas>
    </>
  );
}

export default App;
