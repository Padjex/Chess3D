import { useEffect, useRef, useState } from "react";

import useGame from "../../store/useGame";
import ApplyMove from "./ApplyMove";

import { checkChecker, attackedSquare } from "./chessCheck/chessHelper.js";

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
    // CASTLING
    if (castlingKingSide) {
      let startX = 3;
      let startY = 0;
      if (playerColor === "black") {
        startY = 7;
      }

      if (curX === startX && curY === startY) {
        if (
          chessMatrix[startX - 1][curY].figure === "empty" &&
          chessMatrix[startX - 2][curY].figure === "empty"
        ) {
          if (chessMatrix[0][curY].figure.includes("rook 0")) {
            const attackedSquares = [];
            attackedSquares.push(
              attackedSquare(curX, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX - 1, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX - 2, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX - 3, curY, chessMatrix, opponentColor, "none")
            );
            if (attackedSquares.every((attacked) => attacked === false)) {
              setAvailableSquares((prevSquare) => [
                ...prevSquare,
                {
                  xCoo: chessMatrix[0][startY].position[0],
                  yCoo: chessMatrix[0][startY].position[1],
                  tableLocationFrom: [startX, startY],
                  tableLocation: [0, startY],
                  figureName: activeFigure,
                  capture: false,
                  castling: "castlingKingSide",
                },
              ]);
            }
          }
        }
      }
    }
    if (castlingQueenSide) {
      let startX = 3;
      let startY = 0;
      if (playerColor === "black") {
        startY = 7;
      }

      if (curX === startX && curY === startY) {
        if (
          chessMatrix[startX + 1][curY].figure === "empty" &&
          chessMatrix[startX + 2][curY].figure === "empty" &&
          chessMatrix[startX + 3][curY].figure === "empty"
        ) {
          if (chessMatrix[7][curY].figure.includes("rook 1")) {
            const attackedSquares = [];
            attackedSquares.push(
              attackedSquare(curX, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX + 1, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX + 2, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX + 3, curY, chessMatrix, opponentColor, "none")
            );
            attackedSquares.push(
              attackedSquare(curX + 4, curY, chessMatrix, opponentColor, "none")
            );
            if (attackedSquares.every((attacked) => attacked === false)) {
              setAvailableSquares((prevSquare) => [
                ...prevSquare,
                {
                  xCoo: chessMatrix[7][startY].position[0],
                  yCoo: chessMatrix[7][startY].position[1],
                  tableLocationFrom: [startX, startY],
                  tableLocation: [7, startY],
                  figureName: activeFigure,
                  capture: false,
                  castling: "castlingQueenSide",
                },
              ]);
            }
          }
        }
      }
    }

    // Forward
    if (curY < 7)
      if (!chessMatrix[curX][curY + 1].figure.includes(playerColor)) {
        if (
          !attackedSquare(curX, curY + 1, chessMatrix, opponentColor, figure)
        ) {
          let capture = false;
          if (chessMatrix[curX][curY + 1].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX][curY + 1].position[0],
              yCoo: chessMatrix[curX][curY + 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY + 1],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }

    // Back
    if (curY > 0)
      if (!chessMatrix[curX][curY - 1].figure.includes(playerColor)) {
        if (
          !attackedSquare(curX, curY - 1, chessMatrix, opponentColor, figure)
        ) {
          let capture = false;
          if (chessMatrix[curX][curY - 1].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX][curY - 1].position[0],
              yCoo: chessMatrix[curX][curY - 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY - 1],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }
    // Right
    if (curX < 7)
      if (!chessMatrix[curX + 1][curY].figure.includes(playerColor)) {
        if (
          !attackedSquare(curX + 1, curY, chessMatrix, opponentColor, figure)
        ) {
          let capture = false;
          if (chessMatrix[curX + 1][curY].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX + 1][curY].position[0],
              yCoo: chessMatrix[curX + 1][curY].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX + 1, curY],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }
    // Left
    if (curX > 0)
      if (!chessMatrix[curX - 1][curY].figure.includes(playerColor)) {
        if (
          !attackedSquare(curX - 1, curY, chessMatrix, opponentColor, figure)
        ) {
          let capture = false;
          if (chessMatrix[curX - 1][curY].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX - 1][curY].position[0],
              yCoo: chessMatrix[curX - 1][curY].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX - 1, curY],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }

    // Forward Right
    if (curX < 7 && curY < 7)
      if (!chessMatrix[curX + 1][curY + 1].figure.includes(playerColor)) {
        if (
          !attackedSquare(
            curX + 1,
            curY + 1,
            chessMatrix,
            opponentColor,
            figure
          )
        ) {
          let capture = false;
          if (chessMatrix[curX + 1][curY + 1].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX + 1][curY + 1].position[0],
              yCoo: chessMatrix[curX + 1][curY + 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX + 1, curY + 1],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }

    // Forward Left
    if (curX > 0 && curY < 7)
      if (!chessMatrix[curX - 1][curY + 1].figure.includes(playerColor)) {
        if (
          !attackedSquare(
            curX - 1,
            curY + 1,
            chessMatrix,
            opponentColor,
            figure
          )
        ) {
          let capture = false;
          if (chessMatrix[curX - 1][curY + 1].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX - 1][curY + 1].position[0],
              yCoo: chessMatrix[curX - 1][curY + 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX - 1, curY + 1],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }

    // Back Right
    if (curX < 7 && curY > 0)
      if (!chessMatrix[curX + 1][curY - 1].figure.includes(playerColor)) {
        if (
          !attackedSquare(
            curX + 1,
            curY - 1,
            chessMatrix,
            opponentColor,
            figure
          )
        ) {
          let capture = false;
          if (chessMatrix[curX + 1][curY - 1].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX + 1][curY - 1].position[0],
              yCoo: chessMatrix[curX + 1][curY - 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX + 1, curY - 1],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }
    // Back Left
    if (curX > 0 && curY > 0)
      if (!chessMatrix[curX - 1][curY - 1].figure.includes(playerColor)) {
        if (
          !attackedSquare(
            curX - 1,
            curY - 1,
            chessMatrix,
            opponentColor,
            figure
          )
        ) {
          let capture = false;
          if (chessMatrix[curX - 1][curY - 1].figure.includes(opponentColor)) {
            capture = true;
          }
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX - 1][curY - 1].position[0],
              yCoo: chessMatrix[curX - 1][curY - 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX - 1, curY - 1],
              figureName: activeFigure,
              capture: capture,
            },
          ]);
        }
      }

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
export const KnightMoves = ({
  chessMatrix,
  activeFigure,
  opponentColor,
  playerColor,
  checkMateChecker = false,
}) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  useEffect(() => {
    // FORWARD
    if (curY + 2 < 8) {
      // right
      if (curX + 1 < 8) {
        if (!chessMatrix[curX + 1][curY + 2].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX + 1][curY + 2].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY + 2],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX + 1][curY + 2].position[0],
                yCoo: chessMatrix[curX + 1][curY + 2].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + 1, curY + 2],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }

      // left
      if (curX - 1 >= 0) {
        if (!chessMatrix[curX - 1][curY + 2].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX - 1][curY + 2].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY + 2],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX - 1][curY + 2].position[0],
                yCoo: chessMatrix[curX - 1][curY + 2].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - 1, curY + 2],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }
    }
    // BACK
    if (curY - 2 >= 0) {
      // right
      if (curX + 1 < 8) {
        if (!chessMatrix[curX + 1][curY - 2].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX + 1][curY - 2].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY - 2],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX + 1][curY - 2].position[0],
                yCoo: chessMatrix[curX + 1][curY - 2].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + 1, curY - 2],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }
      // left
      if (curX - 1 >= 0) {
        if (!chessMatrix[curX - 1][curY - 2].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX - 1][curY - 2].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY - 2],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX - 1][curY - 2].position[0],
                yCoo: chessMatrix[curX - 1][curY - 2].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - 1, curY - 2],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }
    }
    // RIGHT
    if (curX + 2 < 8) {
      // forward
      if (curY + 1 < 8) {
        if (!chessMatrix[curX + 2][curY + 1].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX + 2][curY + 1].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 2, curY + 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX + 2][curY + 1].position[0],
                yCoo: chessMatrix[curX + 2][curY + 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + 2, curY + 1],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }
      // back
      if (curY - 1 >= 0) {
        if (!chessMatrix[curX + 2][curY - 1].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX + 2][curY - 1].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 2, curY - 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX + 2][curY - 1].position[0],
                yCoo: chessMatrix[curX + 2][curY - 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + 2, curY - 1],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }
    }
    // LEFT
    if (curX - 2 >= 0) {
      // forward
      if (curY + 1 < 8) {
        if (!chessMatrix[curX - 2][curY + 1].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX - 2][curY + 1].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 2, curY + 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX - 2][curY + 1].position[0],
                yCoo: chessMatrix[curX - 2][curY + 1].position[1],
                figureName: activeFigure,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - 2, curY + 1],
                capture: capture,
              },
            ]);
        }
      }
      // back
      if (curY - 1 >= 0) {
        if (!chessMatrix[curX - 2][curY - 1].figure.includes(playerColor)) {
          let capture = false;
          if (chessMatrix[curX - 2][curY - 1].figure.includes(opponentColor)) {
            capture = true;
          }
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 2, curY - 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX - 2][curY - 1].position[0],
                yCoo: chessMatrix[curX - 2][curY - 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - 2, curY - 1],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
        }
      }
    }
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
const QueenMoves = ({ chessMatrix, activeFigure, opponentColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  useEffect(() => {
    // Forward
    for (let i = curY + 1; i < chessMatrix.length; i++) {
      const xCoo = chessMatrix[curX][i].position[0];
      const yCoo = chessMatrix[curX][i].position[1];
      let capture = false;
      const figure = chessMatrix[curX][i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;

          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX, i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }

      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }
    // Right
    for (let i = curX + 1; i < chessMatrix.length; i++) {
      const xCoo = chessMatrix[i][curY].position[0];
      const yCoo = chessMatrix[i][curY].position[1];
      let capture = false;
      const figure = chessMatrix[i][curY].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [i, curY],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Back
    for (let i = curY - 1; i >= 0; i--) {
      const xCoo = chessMatrix[curX][i].position[0];
      const yCoo = chessMatrix[curX][i].position[1];
      let capture = false;
      const figure = chessMatrix[curX][i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX, i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Left
    for (let i = curX - 1; i >= 0; i--) {
      const xCoo = chessMatrix[i][curY].position[0];
      const yCoo = chessMatrix[i][curY].position[1];
      let capture = false;
      const figure = chessMatrix[i][curY].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [i, curY],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }
    // Forward right
    const endTableFR = Math.max(curX, curY);
    for (let i = 1; i < chessMatrix.length - endTableFR; i++) {
      const xCoo = chessMatrix[curX + i][curY + i].position[0];
      const yCoo = chessMatrix[curX + i][curY + i].position[1];
      let capture = false;
      const figure = chessMatrix[curX + i][curY + i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY + i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + i, curY + i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY + i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Back left
    const endTableBL = Math.min(curX, curY);

    for (let i = 1; i < endTableBL + 1; i++) {
      const xCoo = chessMatrix[curX - i][curY - i].position[0];
      const yCoo = chessMatrix[curX - i][curY - i].position[1];

      let capture = false;
      const figure = chessMatrix[curX - i][curY - i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY - i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - i, curY - i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY - i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Back right
    let endTableBR;
    if (curY >= 7 - curX) {
      endTableBR = 7 - curX;
    } else {
      endTableBR = curY;
    }

    for (let i = 1; i < endTableBR + 1; i++) {
      const xCoo = chessMatrix[curX + i][curY - i].position[0];
      const yCoo = chessMatrix[curX + i][curY - i].position[1];
      let capture = false;
      const figure = chessMatrix[curX + i][curY - i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY - i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + i, curY - i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY - i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Forward left
    let endTableFL;
    if (curX >= 7 - curY) {
      endTableFL = 7 - curY;
    } else {
      endTableFL = curX;
    }
    for (let i = 1; i < endTableFL + 1; i++) {
      const xCoo = chessMatrix[curX - i][curY + i].position[0];
      const yCoo = chessMatrix[curX - i][curY + i].position[1];
      let capture = false;
      const figure = chessMatrix[curX - i][curY + i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY + i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - i, curY + i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY + i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }
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
const RookMoves = ({ chessMatrix, activeFigure, opponentColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  useEffect(() => {
    // Forward
    for (let i = curY + 1; i < chessMatrix.length; i++) {
      const xCoo = chessMatrix[curX][i].position[0];
      const yCoo = chessMatrix[curX][i].position[1];
      let capture = false;
      const figure = chessMatrix[curX][i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX, i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }
    // Right
    for (let i = curX + 1; i < chessMatrix.length; i++) {
      const xCoo = chessMatrix[i][curY].position[0];
      const yCoo = chessMatrix[i][curY].position[1];
      let capture = false;
      const figure = chessMatrix[i][curY].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [i, curY],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Back
    for (let i = curY - 1; i >= 0; i--) {
      const xCoo = chessMatrix[curX][i].position[0];
      const yCoo = chessMatrix[curX][i].position[1];
      let capture = false;
      const figure = chessMatrix[curX][i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX, i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Left
    for (let i = curX - 1; i >= 0; i--) {
      const xCoo = chessMatrix[i][curY].position[0];
      const yCoo = chessMatrix[i][curY].position[1];
      let capture = false;
      const figure = chessMatrix[i][curY].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [i, curY],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

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
const BishopMoves = ({ chessMatrix, activeFigure, opponentColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  useEffect(() => {
    // Forward right
    const endTableFR = Math.max(curX, curY);
    for (let i = 1; i < chessMatrix.length - endTableFR; i++) {
      const xCoo = chessMatrix[curX + i][curY + i].position[0];
      const yCoo = chessMatrix[curX + i][curY + i].position[1];
      let capture = false;
      const figure = chessMatrix[curX + i][curY + i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY + i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + i, curY + i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY + i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Back left
    const endTableBL = Math.min(curX, curY);

    for (let i = 1; i < endTableBL + 1; i++) {
      const xCoo = chessMatrix[curX - i][curY - i].position[0];
      const yCoo = chessMatrix[curX - i][curY - i].position[1];

      let capture = false;
      const figure = chessMatrix[curX - i][curY - i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY - i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - i, curY - i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY - i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Back right
    let endTableBR;
    if (curY >= 7 - curX) {
      endTableBR = 7 - curX;
    } else {
      endTableBR = curY;
    }

    for (let i = 1; i < endTableBR + 1; i++) {
      const xCoo = chessMatrix[curX + i][curY - i].position[0];
      const yCoo = chessMatrix[curX + i][curY - i].position[1];
      let capture = false;
      const figure = chessMatrix[curX + i][curY - i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY - i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };
      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + i, curY - i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY - i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

    // Forward left
    let endTableFL;
    if (curX >= 7 - curY) {
      endTableFL = 7 - curY;
    } else {
      endTableFL = curX;
    }
    for (let i = 1; i < endTableFL + 1; i++) {
      const xCoo = chessMatrix[curX - i][curY + i].position[0];
      const yCoo = chessMatrix[curX - i][curY + i].position[1];
      let capture = false;
      const figure = chessMatrix[curX - i][curY + i].figure;

      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY + i],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: activeFigure,
      };

      if (figure != "empty") {
        if (figure.includes(opponentColor)) {
          capture = true;
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: xCoo,
                yCoo: yCoo,
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - i, curY + i],
                figureName: activeFigure,
                capture: capture,
              },
            ]);
          break;
        } else {
          break;
        }
      }
      if (!checkChecker(checkProps))
        setAvailableSquares((prevSquare) => [
          ...prevSquare,
          {
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY + i],
            figureName: activeFigure,
            capture: capture,
          },
        ]);
    }

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

const PawnWhiteMoves = ({ chessMatrix, activeFigure, opponentColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  const enPassantPossibility = useGame((state) => state.enPassantPossibility);

  useEffect(() => {
    // Forward
    if (curY + 1 < 8) {
      if (chessMatrix[curX][curY + 1].figure === "empty") {
        const checkProps = {
          tableLocationFrom: [curX, curY],
          tableLocation: [curX, curY + 1],
          opponentColor: opponentColor,
          chessMatrix: chessMatrix,
          figure: activeFigure,
        };
        if (!checkChecker(checkProps))
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX][curY + 1].position[0],
              yCoo: chessMatrix[curX][curY + 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY + 1],
              figureName: activeFigure,
              capture: false,
            },
          ]);
      }
      // First move
      if (curY === 1) {
        if (chessMatrix[curX][curY + 1].figure === "empty")
          if (chessMatrix[curX][curY + 2].figure === "empty") {
            const checkProps = {
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY + 2],
              opponentColor: opponentColor,
              chessMatrix: chessMatrix,
              figure: activeFigure,
            };
            if (!checkChecker(checkProps))
              setAvailableSquares((prevSquare) => [
                ...prevSquare,
                {
                  xCoo: chessMatrix[curX][curY + 2].position[0],
                  yCoo: chessMatrix[curX][curY + 2].position[1],
                  tableLocationFrom: [curX, curY],
                  tableLocation: [curX, curY + 2],
                  figureName: activeFigure,
                  capture: false,
                  enPassant: true,
                },
              ]);
          }
      }

      // En passant
      if (enPassantPossibility && curY === 4) {
        if (Math.abs(enPassantPossibility[0] - curX) === 1) {
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [enPassantPossibility[0], curY + 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[enPassantPossibility[0]][curY + 1]
                  .position[0],
                yCoo: chessMatrix[enPassantPossibility[0]][curY + 1]
                  .position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [enPassantPossibility[0], curY + 1],
                figureName: activeFigure,
                capture: true,
                enPassantPlayed: enPassantPossibility,
              },
            ]);
        }
      }

      // Diagonal right
      if (curX + 1 < 8) {
        if (chessMatrix[curX + 1][curY + 1].figure.includes(opponentColor)) {
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY + 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX + 1][curY + 1].position[0],
                yCoo: chessMatrix[curX + 1][curY + 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + 1, curY + 1],
                figureName: activeFigure,
                capture: true,
              },
            ]);
        }
      }

      // Diagonal left
      if (curX - 1 >= 0) {
        if (chessMatrix[curX - 1][curY + 1].figure.includes(opponentColor)) {
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY + 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX - 1][curY + 1].position[0],
                yCoo: chessMatrix[curX - 1][curY + 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - 1, curY + 1],
                figureName: activeFigure,
                capture: true,
              },
            ]);
        }
      }
    }
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
// // // en passant needs to add

const PawnBlackMoves = ({ chessMatrix, activeFigure, opponentColor }) => {
  const { tableLocation } = chessMatrix
    .flat()
    .find((square) => square.figure === activeFigure);

  const curX = tableLocation[0];
  const curY = tableLocation[1];

  const [availableSquares, setAvailableSquares] = useState([]);

  const enPassantPossibility = useGame((state) => state.enPassantPossibility);

  useEffect(() => {
    // Forward
    if (curY - 1 >= 0) {
      if (chessMatrix[curX][curY - 1].figure === "empty") {
        const checkProps = {
          tableLocationFrom: [curX, curY],
          tableLocation: [curX, curY - 1],
          opponentColor: opponentColor,
          chessMatrix: chessMatrix,
          figure: activeFigure,
        };
        if (!checkChecker(checkProps))
          setAvailableSquares((prevSquare) => [
            ...prevSquare,
            {
              xCoo: chessMatrix[curX][curY - 1].position[0],
              yCoo: chessMatrix[curX][curY - 1].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY - 1],
              figureName: activeFigure,
              capture: false,
            },
          ]);
      }
      // First move
      if (curY === 6) {
        if (chessMatrix[curX][curY - 1].figure === "empty")
          if (chessMatrix[curX][curY - 2].figure === "empty") {
            const checkProps = {
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY - 2],
              opponentColor: opponentColor,
              chessMatrix: chessMatrix,
              figure: activeFigure,
            };
            if (!checkChecker(checkProps))
              setAvailableSquares((prevSquare) => [
                ...prevSquare,
                {
                  xCoo: chessMatrix[curX][curY - 2].position[0],
                  yCoo: chessMatrix[curX][curY - 2].position[1],
                  tableLocationFrom: [curX, curY],
                  tableLocation: [curX, curY - 2],
                  figureName: activeFigure,
                  capture: false,
                  enPassant: true,
                },
              ]);
          }
      }
      // En passant
      if (enPassantPossibility && curY === 3) {
        if (Math.abs(enPassantPossibility[0] - curX) === 1) {
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [enPassantPossibility[0], curY - 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[enPassantPossibility[0]][curY - 1]
                  .position[0],
                yCoo: chessMatrix[enPassantPossibility[0]][curY - 1]
                  .position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [enPassantPossibility[0], curY - 1],
                figureName: activeFigure,
                capture: true,
                enPassantPlayed: enPassantPossibility,
              },
            ]);
        }
      }

      // Diagonal right
      if (curX - 1 >= 0) {
        if (chessMatrix[curX - 1][curY - 1].figure.includes(opponentColor)) {
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY - 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX - 1][curY - 1].position[0],
                yCoo: chessMatrix[curX - 1][curY - 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX - 1, curY - 1],
                figureName: activeFigure,
                capture: true,
              },
            ]);
        }
      }
      // Diagonal left
      if (curX + 1 < 8) {
        if (chessMatrix[curX + 1][curY - 1].figure.includes(opponentColor)) {
          const checkProps = {
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY - 1],
            opponentColor: opponentColor,
            chessMatrix: chessMatrix,
            figure: activeFigure,
          };
          if (!checkChecker(checkProps))
            setAvailableSquares((prevSquare) => [
              ...prevSquare,
              {
                xCoo: chessMatrix[curX + 1][curY - 1].position[0],
                yCoo: chessMatrix[curX + 1][curY - 1].position[1],
                tableLocationFrom: [curX, curY],
                tableLocation: [curX + 1, curY - 1],
                figureName: activeFigure,
                capture: true,
              },
            ]);
        }
      }
    }
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
