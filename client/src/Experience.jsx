import { ContactShadows, OrbitControls, SoftShadows } from "@react-three/drei";
import Model from "./components/Model";
import Lights from "./components/Lights";
import Background from "./components/Background";
import Game from "/components/game/Game";
import SetGame from "./components/game/SetGame";

import { CameraAnimation } from "./components/CameraAnimation";
import useGame from "./store/useGame";
import { Perf } from "r3f-perf";

export default function Experience() {
  return (
    <>
      <Perf />
      <OrbitControls makeDefault />
      <Model />
      <Game />

      <Lights />
      <Background />
      <CameraAnimation />
    </>
  );
}
