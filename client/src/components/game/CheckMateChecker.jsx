import { useEffect, useRef, useState } from "react";
import useGame from "../../store/useGame";
import { checkChecker, attackedSquare } from "./chessCheck/chessHelper.js";
import {
  kingMoves,
  knightMoves,
  queenMoves,
  rookMoves,
  bishopMoves,
  pawnWhiteMoves,
  pawnBlackMoves,
} from "./moveFigures/moveFigures.js";

export default function CheckMateChecker() {
  const checkKingPlayer = useGame((state) => state.checkKingPlayer);
  const playerColor = useGame((state) => state.playerColor);
  const checkForMate = useGame((state) => state.checkForMate);
  const chessMatrix = useGame((state) => state.chessMatrix);
  const setCheckForMate = useGame((state) => state.setCheckForMate);

  const opponentColor = playerColor === "white" ? "black" : "white";

  useEffect(() => {
    if (checkForMate) {
      const opponenetFigures = chessMatrix
        .flat()
        .filter((square) => square.figure.includes(opponentColor));

      const isAvailableSquare = opponenetFigures.some((square) => {
        console.log(square);
        // king check
        if (square.figure.includes("king")) {
          const kingSquares = kingMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("King: " + kingSquares);
          if (kingSquares > 0) {
            return true;
          }
        }
        // rook check
        if (square.figure.includes("rook")) {
          console.log("rook: " + square.figure);
          const rookSquares = rookMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("Rook: " + rookSquares);
          if (rookSquares > 0) {
            return true;
          }
        }
        // queen check
        if (square.figure.includes("queen")) {
          const queenSquares = queenMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("Queen: " + queenSquares);
          if (queenSquares > 0) {
            return true;
          }
        }

        // knight check
        if (square.figure.includes("knight")) {
          const knightSquares = knightMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("Knight: " + knightSquares);
          if (knightSquares > 0) {
            return true;
          }
        }

        // bishop check
        if (square.figure.includes("bishop")) {
          const bishopSquares = bishopMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("Bishop: " + bishopSquares);
          if (bishopSquares > 0) {
            return true;
          }
        }

        // pawn white check
        if (square.figure.includes("white pawn")) {
          const whitePawnSquares = pawnWhiteMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("WhitePawn: " + whitePawnSquares);
          if (whitePawnSquares > 0) {
            return true;
          }
        }
        // pawn black check
        if (square.figure.includes("black pawn")) {
          const blackPawnSquares = pawnBlackMoves({
            chessMatrix,
            curX: square.tableLocation[0],
            curY: square.tableLocation[1],
            figure: square.figure,
            playerColor: opponentColor,
            checkForMate: true,
          });
          console.log("BlackPawn: " + blackPawnSquares);
          if (blackPawnSquares > 0) {
            return true;
          }
        }
      });

      if (!isAvailableSquare) {
        if (checkKingPlayer) alert("win");
        else alert("stalemate");
      }
    }
    return () => {
      setCheckForMate();
    };
  }, [checkForMate]);

  return null;
}
