import * as THREE from "three";
import { useTexture, useGLTF } from "@react-three/drei";
import FieldsHelper from "./FileldHelper";
import SetGame from "./SetGame";
import useGame from "../../store/useGame";
import MoveFigures from "./MoveFigures";

export default function Game() {
  const textureBlack = useTexture("./blender/proba/black/color.jpg");
  const blackMaterial = new THREE.MeshStandardMaterial({ map: textureBlack });
  const textureWhite = useTexture("./blender/proba/white/color.jpg");
  const whiteMaterial = new THREE.MeshStandardMaterial({ map: textureWhite });

  const started = useGame((state) => state.started);

  // for pick color
  // const players = useGame((state) => state.players);
  // const readyOppnent = players.length;

  return (
    <>
      {started && (
        <>
          <SetGame
            whiteMaterial={whiteMaterial}
            blackMaterial={blackMaterial}
          />
          <MoveFigures />
        </>
      )}
      <FieldsHelper />
      {/* for pick color */}
      {/* {readyOppnent !== 0 ? (
        <PickColor playarsNames={players} name={name} />
      ) : null} */}
    </>
  );
}

useTexture.preload("./blender/proba/black/color.jpg");
useTexture.preload("./blender/proba/white/color.jpg");
useGLTF.preload("./blender/figures/pawn.glb");
useGLTF.preload("./blender/figures/king.glb");
useGLTF.preload("./blender/figures/rook.glb");
useGLTF.preload("./blender/figures/knight.glb");
useGLTF.preload("./blender/figures/queen.glb");
useGLTF.preload("./blender/figures/bishop.glb");
