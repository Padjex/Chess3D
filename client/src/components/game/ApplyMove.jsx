import * as THREE from "three";
import useGame from "../../store/useGame";

const redMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.3,
  color: "red",
});
const greenMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.3,
  color: "green",
});

// Here, perform an undo action, and if more than 2 seconds have passed,then // execute the change on the fieldMatrix?

//Here, perform a move confirmation, which automatically updates the fieldMatrix.

export default function ApplyMove({ props }) {
  const {
    xCoo,
    yCoo,
    figureName,
    tableLocation,
    capture,
    tableLocationFrom,
    castling = false,
    enPassant = false,
    enPassantPlayed = false,
  } = props;

  const setApplyMove = useGame((state) => state.setApplyMove);

  // set new move, send a props on click to zustand
  const makeMove = () => {
    setApplyMove(
      tableLocation,
      figureName,
      tableLocationFrom,
      castling,
      enPassant,
      enPassantPlayed
    );
  };
  return (
    <>
      <mesh
        onClick={makeMove}
        rotation-x={-Math.PI * 0.5}
        position={[xCoo, 0.5, yCoo]}
        material={capture ? redMaterial : greenMaterial}
      >
        <planeGeometry args={[0.23, 0.23]} />
      </mesh>
    </>
  );
}
