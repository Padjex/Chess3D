import * as THREE from "three";

import useGame from "../../store/useGame";
import { AttackedSquare } from "./AttackedSquare";

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
  const playerColor = useGame((state) => state.playerColor);
  const chessMatrix = useGame((state) => state.chessMatrix);
  const setApplyMove = useGame((state) => state.setApplyMove);

  const onMoveUndo = useGame((state) => state.onMoveUndo);

  const opponentColor = playerColor === "white" ? "black" : "white";

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
    // Check to the player's King
    // const kingSquares = chessMatrix
    //   .flat()
    //   .find((squares) => squares.figure === "king " + playerColor);

    // const x = kingSquares.tableLocation[0];
    // const y = kingSquares.tableLocation[1];

    // const check = AttackedSquare(
    //   x,
    //   y,
    //   chessMatrix,
    //   opponentColor,
    //   kingSquares.figure
    // );

    // if (check === true) {
    //   onMoveUndo();
    //   console.log(
    //     "Your move is invalid because your king is in check. Please make a move to get your king out of check."
    //   );
    // }
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
