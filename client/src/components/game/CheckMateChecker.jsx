import { useEffect, useRef } from "react";
import useGame from "../../store/useGame";
import { KnightMoves } from "./MoveFigures";

export default function CheckMateChecker() {
  const checkKingOpponent = useGame((state) => state.checkKingOpponent);
  const chessMatrix = useGame((state) => state.chessMatrix);
  const xProps = {
    chessMatrix: chessMatrix,
    activeFigure: "black knight 0",
    opponentColor: "white",
    playerColor: "black",
    checkMateChecker: true,
  };

  useEffect(() => {
    if (checkKingOpponent) {
      const x = KnightMoves({
        chessMatrix: chessMatrix,
        activeFigure: "black knight 0",
        opponentColor: "white",
        playerColor: "black",
        checkMateChecker: true,
      });
      console.log(x);
    }
  }, [checkKingOpponent]);

  // return <KnightMoves ref={x} xProps />;
}
