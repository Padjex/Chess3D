import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Model() {
  const { nodes } = useGLTF("./blender/chessTable.glb");

  const texture = useTexture("./blender/baked2.png");
  // const texture2 = useTexture("./blender/baked.jpg");

  texture.flipY = false;
  // texture2.flipY = false;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });

  return (
    <>
      <group receiveShadow scale={0.2} position-y={-2.6}>
        <mesh
          receiveShadow
          geometry={nodes.Chess.geometry}
          material={material}
          position={nodes.Chess.position}
          scale={nodes.Chess.scale}
        />
        <mesh
          receiveShadow
          geometry={nodes.Table.geometry}
          material={material}
          position={nodes.Table.position}
          scale={nodes.Table.scale}
        />
      </group>
    </>
  );
}
useGLTF.preload("./blender/chessTable.glb");
// useTexture.preload("./blender/baked.jpg");
useTexture.preload("./blender/baked2.png");
