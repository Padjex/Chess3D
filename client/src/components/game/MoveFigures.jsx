import { useEffect, useRef, useState } from "react";

import useGame from "../../store/useGame";
import ApplyMove from "./ApplyMove";
import {
  kingMoves,
  knightMoves,
  queenMoves,
  rookMoves,
  bishopMoves,
  pawnWhiteMoves,
  pawnBlackMoves,
} from "./moveFigures/moveFigures.js";

export default function MoveFigures() {
  const activeFigure = useGame((state) => state.activeFigure);

  const opponentColor = useGame((state) => state.opponentColor);
  const playerColor = useGame((state) => state.playerColor);
  const chessMatrix = useGame((state) => state.chessMatrix);

  return (
    <>
      {activeFigure.includes("white pawn") && (
        <PawnWhiteMoves
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
      {activeFigure.includes("black pawn") && (
        <PawnBlackMoves
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
      {activeFigure.includes("knight") && (
        <KnightMoves
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
      {activeFigure.includes("bishop") && (
        <BishopMoves
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
      {activeFigure.includes("rook") && (
        <RookMoves
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
      {activeFigure.includes("queen") && (
        <QueenMoves
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
      {activeFigure.includes("king") && (
        <KingMove
          chessMatrix={chessMatrix}
          activeFigure={activeFigure}
          opponentColor={opponentColor}
          playerColor={playerColor}
        />
      )}
    </>
  );
}

//****
//// King move
//****
export const KingMove = ({
  chessMatrix,
  activeFigure,
  opponentColor,
  playerColor,
}) => {
  const square = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = square.tableLocation[0];
  const curY = square.tableLocation[1];

  const figure = square.figure;

  const [availableSquares, setAvailableSquares] = useState([]);

  const castlingKingSide = useGame((state) => state.castlingKingSide);
  const castlingQueenSide = useGame((state) => state.castlingQueenSide);

  useEffect(() => {
    setAvailableSquares(
      kingMoves({
        chessMatrix,
        curX,
        curY,
        figure,
        playerColor,
        castlingKingSide,
        castlingQueenSide,
      })
    );

    return () => setAvailableSquares([]);
  }, [activeFigure]);

  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};

//****
//// Knight move
//****
export const KnightMoves = ({ chessMatrix, activeFigure, playerColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const figure = activeFigure;

  const [availableSquares, setAvailableSquares] = useState([]);

  useEffect(() => {
    setAvailableSquares(
      knightMoves({ chessMatrix, curX, curY, figure, playerColor })
    );

    return () => {
      setAvailableSquares([]);
    };
  }, [activeFigure]);

  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};

//****
//// Queen move
//****
const QueenMoves = ({ chessMatrix, activeFigure, playerColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);
  const figure = activeFigure;

  useEffect(() => {
    setAvailableSquares(
      queenMoves({ chessMatrix, curX, curY, figure, playerColor })
    );

    return () => setAvailableSquares([]);
  }, [activeFigure]);
  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};

//****
//// Rook move
//****
const RookMoves = ({ chessMatrix, activeFigure, playerColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  const figure = activeFigure;

  useEffect(() => {
    setAvailableSquares(
      rookMoves({ chessMatrix, curX, curY, figure, playerColor })
    );

    return () => setAvailableSquares([]);
  }, [activeFigure]);

  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};

//****
//// Bishop move
//****
const BishopMoves = ({ chessMatrix, activeFigure, playerColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const figure = activeFigure;

  const [availableSquares, setAvailableSquares] = useState([]);

  useEffect(() => {
    setAvailableSquares(
      bishopMoves({ chessMatrix, curX, curY, figure, playerColor })
    );
    return () => setAvailableSquares([]);
  }, [activeFigure]);

  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};

//****
//// Pawn white move
//****

const PawnWhiteMoves = ({ chessMatrix, activeFigure, playerColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  const enPassantPossibility = useGame((state) => state.enPassantPossibility);

  const figure = activeFigure;

  useEffect(() => {
    setAvailableSquares(
      pawnWhiteMoves({
        chessMatrix,
        curX,
        curY,
        figure,
        playerColor,
        enPassantPossibility,
      })
    );
    return () => {
      setAvailableSquares([]);
    };
  }, [activeFigure]);

  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};

//****
//// Pawn black move
//****

const PawnBlackMoves = ({ chessMatrix, activeFigure, playerColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  const enPassantPossibility = useGame((state) => state.enPassantPossibility);

  const figure = activeFigure;

  useEffect(() => {
    setAvailableSquares(
      pawnBlackMoves({
        chessMatrix,
        curX,
        curY,
        figure,
        playerColor,
        enPassantPossibility,
      })
    );
    return () => {
      setAvailableSquares([]);
    };
  }, [activeFigure]);

  return (
    <>
      {availableSquares.map((props, index) => (
        <ApplyMove key={index} props={props} />
      ))}
    </>
  );
};
