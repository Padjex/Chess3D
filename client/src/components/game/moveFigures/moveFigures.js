import { KnightMoves } from "../MoveFigures.jsx";
import { checkChecker, attackedSquare } from "../chessCheck/chessHelper.js";

// "It could improve the performance of functions so that when called for the checkmate check (CheckMateChecker.jsx), the function returns a value on the first available square indicating that there is no checkmate or stalemate. ??"

//****
//// King move
//****
export const kingMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  castlingKingSide = false,
  castlingQueenSide = false,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

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
            availableSquares.push({
              xCoo: chessMatrix[0][startY].position[0],
              yCoo: chessMatrix[0][startY].position[1],
              tableLocationFrom: [startX, startY],
              tableLocation: [0, startY],
              figureName: figure,
              capture: false,
              castling: "castlingKingSide",
            });
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
            availableSquares.push({
              xCoo: chessMatrix[7][startY].position[0],
              yCoo: chessMatrix[7][startY].position[1],
              tableLocationFrom: [startX, startY],
              tableLocation: [7, startY],
              figureName: figure,
              capture: false,
              castling: "castlingQueenSide",
            });
          }
        }
      }
    }
  }

  // Forward
  if (curY < 7)
    if (!chessMatrix[curX][curY + 1].figure.includes(playerColor)) {
      if (!attackedSquare(curX, curY + 1, chessMatrix, opponentColor, figure)) {
        let capture = false;
        if (chessMatrix[curX][curY + 1].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX][curY + 1].position[0],
          yCoo: chessMatrix[curX][curY + 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX, curY + 1],
          figureName: figure,
          capture: capture,
        });
      }
    }

  //   Back;
  if (curY > 0)
    if (!chessMatrix[curX][curY - 1].figure.includes(playerColor)) {
      if (!attackedSquare(curX, curY - 1, chessMatrix, opponentColor, figure)) {
        let capture = false;
        if (chessMatrix[curX][curY - 1].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX][curY - 1].position[0],
          yCoo: chessMatrix[curX][curY - 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX, curY - 1],
          figureName: figure,
          capture: capture,
        });
      }
    }
  // Right
  if (curX < 7)
    if (!chessMatrix[curX + 1][curY].figure.includes(playerColor)) {
      if (!attackedSquare(curX + 1, curY, chessMatrix, opponentColor, figure)) {
        let capture = false;
        if (chessMatrix[curX + 1][curY].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX + 1][curY].position[0],
          yCoo: chessMatrix[curX + 1][curY].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX + 1, curY],
          figureName: figure,
          capture: capture,
        });
      }
    }
  // Left
  if (curX > 0)
    if (!chessMatrix[curX - 1][curY].figure.includes(playerColor)) {
      if (!attackedSquare(curX - 1, curY, chessMatrix, opponentColor, figure)) {
        let capture = false;
        if (chessMatrix[curX - 1][curY].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX - 1][curY].position[0],
          yCoo: chessMatrix[curX - 1][curY].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX - 1, curY],
          figureName: figure,
          capture: capture,
        });
      }
    }

  // Forward Right
  if (curX < 7 && curY < 7)
    if (!chessMatrix[curX + 1][curY + 1].figure.includes(playerColor)) {
      if (
        !attackedSquare(curX + 1, curY + 1, chessMatrix, opponentColor, figure)
      ) {
        let capture = false;
        if (chessMatrix[curX + 1][curY + 1].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX + 1][curY + 1].position[0],
          yCoo: chessMatrix[curX + 1][curY + 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX + 1, curY + 1],
          figureName: figure,
          capture: capture,
        });
      }
    }

  // Forward Left
  if (curX > 0 && curY < 7)
    if (!chessMatrix[curX - 1][curY + 1].figure.includes(playerColor)) {
      if (
        !attackedSquare(curX - 1, curY + 1, chessMatrix, opponentColor, figure)
      ) {
        let capture = false;
        if (chessMatrix[curX - 1][curY + 1].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX - 1][curY + 1].position[0],
          yCoo: chessMatrix[curX - 1][curY + 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX - 1, curY + 1],
          figureName: figure,
          capture: capture,
        });
      }
    }

  // Back Right
  if (curX < 7 && curY > 0)
    if (!chessMatrix[curX + 1][curY - 1].figure.includes(playerColor)) {
      if (
        !attackedSquare(curX + 1, curY - 1, chessMatrix, opponentColor, figure)
      ) {
        let capture = false;
        if (chessMatrix[curX + 1][curY - 1].figure.includes(opponentColor)) {
          capture = true;
        }
        availableSquares.push({
          xCoo: chessMatrix[curX + 1][curY - 1].position[0],
          yCoo: chessMatrix[curX + 1][curY - 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX + 1, curY - 1],
          figureName: figure,
          capture: capture,
        });
      }
    }
  // Back Left
  if (curX > 0 && curY > 0)
    if (!chessMatrix[curX - 1][curY - 1].figure.includes(playerColor)) {
      if (
        !attackedSquare(curX - 1, curY - 1, chessMatrix, opponentColor, figure)
      ) {
        let capture = false;
        if (chessMatrix[curX - 1][curY - 1].figure.includes(opponentColor)) {
          capture = true;
        }

        availableSquares.push({
          xCoo: chessMatrix[curX - 1][curY - 1].position[0],
          yCoo: chessMatrix[curX - 1][curY - 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX - 1, curY - 1],
          figureName: figure,
          capture: capture,
        });
      }
    }

  if (checkForMate) {
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};
//****
//// Knight move
//****
export const knightMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX + 1][curY + 2].position[0],
            yCoo: chessMatrix[curX + 1][curY + 2].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY + 2],
            figureName: figure,
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX - 1][curY + 2].position[0],
            yCoo: chessMatrix[curX - 1][curY + 2].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY + 2],
            figureName: figure,
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX + 1][curY - 2].position[0],
            yCoo: chessMatrix[curX + 1][curY - 2].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY - 2],
            figureName: figure,
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX - 1][curY - 2].position[0],
            yCoo: chessMatrix[curX - 1][curY - 2].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY - 2],
            figureName: figure,
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX + 2][curY + 1].position[0],
            yCoo: chessMatrix[curX + 2][curY + 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 2, curY + 1],
            figureName: figure,
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX + 2][curY - 1].position[0],
            yCoo: chessMatrix[curX + 2][curY - 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 2, curY - 1],
            figureName: figure,
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX - 2][curY + 1].position[0],
            yCoo: chessMatrix[curX - 2][curY + 1].position[1],
            figureName: figure,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 2, curY + 1],
            capture: capture,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX - 2][curY - 1].position[0],
            yCoo: chessMatrix[curX - 2][curY - 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 2, curY - 1],
            figureName: figure,
            capture: capture,
          });
      }
    }
  }
  if (checkForMate) {
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};

//****
//// Queen move
//****
export const queenMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

  //   Forward;
  for (let i = curY + 1; i < chessMatrix.length; i++) {
    const xCoo = chessMatrix[curX][i].position[0];
    const yCoo = chessMatrix[curX][i].position[1];
    let capture = false;
    const figureSquare = chessMatrix[curX][i].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX, i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        figureName: figure,
        capture: capture,
      });
  }
  // Right
  for (let i = curX + 1; i < chessMatrix.length; i++) {
    const xCoo = chessMatrix[i][curY].position[0];
    const yCoo = chessMatrix[i][curY].position[1];
    let capture = false;
    const figureSquare = chessMatrix[i][curY].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [i, curY],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        figureName: figure,
        capture: capture,
      });
  }

  // Back
  for (let i = curY - 1; i >= 0; i--) {
    const xCoo = chessMatrix[curX][i].position[0];
    const yCoo = chessMatrix[curX][i].position[1];
    let capture = false;
    const figureSquare = chessMatrix[curX][i].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX, i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };

    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        figureName: figure,
        capture: capture,
      });
  }

  // Left
  for (let i = curX - 1; i >= 0; i--) {
    const xCoo = chessMatrix[i][curY].position[0];
    const yCoo = chessMatrix[i][curY].position[1];
    let capture = false;
    const figureSquare = chessMatrix[i][curY].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [i, curY],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };

    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        figureName: figure,
        capture: capture,
      });
  }
  // Forward right
  const endTableFR = Math.max(curX, curY);
  for (let i = 1; i < chessMatrix.length - endTableFR; i++) {
    const xCoo = chessMatrix[curX + i][curY + i].position[0];
    const yCoo = chessMatrix[curX + i][curY + i].position[1];
    let capture = false;
    const figureSquare = chessMatrix[curX + i][curY + i].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX + i, curY + i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY + i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY + i],
        figureName: figure,
        capture: capture,
      });
  }

  // Back left
  const endTableBL = Math.min(curX, curY);

  for (let i = 1; i < endTableBL + 1; i++) {
    const xCoo = chessMatrix[curX - i][curY - i].position[0];
    const yCoo = chessMatrix[curX - i][curY - i].position[1];

    let capture = false;
    const figureSquare = chessMatrix[curX - i][curY - i].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX - i, curY - i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY - i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY - i],
        figureName: figure,
        capture: capture,
      });
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
    const figureSquare = chessMatrix[curX + i][curY - i].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX + i, curY - i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY - i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY - i],
        figureName: figure,
        capture: capture,
      });
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
    const figureSquare = chessMatrix[curX - i][curY + i].figure;
    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX - i, curY + i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY + i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY + i],
        figureName: figure,
        capture: capture,
      });
  }
  if (checkForMate) {
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};

//****
//// Rook move
//****
export const rookMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

  // Forward
  for (let i = curY + 1; i < chessMatrix.length; i++) {
    const xCoo = chessMatrix[curX][i].position[0];
    const yCoo = chessMatrix[curX][i].position[1];
    let capture = false;
    const figureSquare = chessMatrix[curX][i].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX, i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };

    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        figureName: figure,
        capture: capture,
      });
  }
  // Right
  for (let i = curX + 1; i < chessMatrix.length; i++) {
    const xCoo = chessMatrix[i][curY].position[0];
    const yCoo = chessMatrix[i][curY].position[1];
    let capture = false;
    const figureSquare = chessMatrix[i][curY].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [i, curY],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        figureName: figure,
        capture: capture,
      });
  }

  // Back
  for (let i = curY - 1; i >= 0; i--) {
    const xCoo = chessMatrix[curX][i].position[0];
    const yCoo = chessMatrix[curX][i].position[1];
    let capture = false;
    const figureSquare = chessMatrix[curX][i].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX, i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };

    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX, i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, i],
        figureName: figure,
        capture: capture,
      });
  }

  // Left
  for (let i = curX - 1; i >= 0; i--) {
    const xCoo = chessMatrix[i][curY].position[0];
    const yCoo = chessMatrix[i][curY].position[1];
    let capture = false;
    const figureSquare = chessMatrix[i][curY].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [i, curY],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };

    if (figureSquare != "empty") {
      if (figureSquare.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [i, curY],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [i, curY],
        figureName: figure,
        capture: capture,
      });
  }

  if (checkForMate) {
    console.log(availableSquares.length);
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};

//****
//// Bishop move
//****
export const bishopMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

  // Forward right
  const endTableFR = Math.max(curX, curY);
  for (let i = 1; i < chessMatrix.length - endTableFR; i++) {
    const xCoo = chessMatrix[curX + i][curY + i].position[0];
    const yCoo = chessMatrix[curX + i][curY + i].position[1];
    let capture = false;
    const figureSquares = chessMatrix[curX + i][curY + i].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX + i, curY + i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquares != "empty") {
      if (figureSquares.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY + i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY + i],
        figureName: figure,
        capture: capture,
      });
  }

  // Back left
  const endTableBL = Math.min(curX, curY);

  for (let i = 1; i < endTableBL + 1; i++) {
    const xCoo = chessMatrix[curX - i][curY - i].position[0];
    const yCoo = chessMatrix[curX - i][curY - i].position[1];

    let capture = false;
    const figureSquares = chessMatrix[curX - i][curY - i].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX - i, curY - i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquares != "empty") {
      if (figureSquares.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY - i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY - i],
        figureName: figure,
        capture: capture,
      });
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
    const figureSquares = chessMatrix[curX + i][curY - i].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX + i, curY - i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };
    if (figureSquares != "empty") {
      if (figureSquares.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + i, curY - i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX + i, curY - i],
        figureName: figure,
        capture: capture,
      });
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
    const figureSquares = chessMatrix[curX - i][curY + i].figure;

    const checkProps = {
      tableLocationFrom: [curX, curY],
      tableLocation: [curX - i, curY + i],
      opponentColor: opponentColor,
      chessMatrix: chessMatrix,
      figure: figure,
    };

    if (figureSquares != "empty") {
      if (figureSquares.includes(opponentColor)) {
        capture = true;
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: xCoo,
            yCoo: yCoo,
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - i, curY + i],
            figureName: figure,
            capture: capture,
          });
        break;
      } else {
        break;
      }
    }
    if (!checkChecker(checkProps))
      availableSquares.push({
        xCoo: xCoo,
        yCoo: yCoo,
        tableLocationFrom: [curX, curY],
        tableLocation: [curX - i, curY + i],
        figureName: figure,
        capture: capture,
      });
  }

  if (checkForMate) {
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};

//****
//// Pawn white move
//****
export const pawnWhiteMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  enPassantPossibility,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

  // Forward
  if (curY + 1 < 8) {
    if (chessMatrix[curX][curY + 1].figure === "empty") {
      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, curY + 1],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: figure,
      };
      if (!checkChecker(checkProps))
        availableSquares.push({
          xCoo: chessMatrix[curX][curY + 1].position[0],
          yCoo: chessMatrix[curX][curY + 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX, curY + 1],
          figureName: figure,
          capture: false,
        });
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
            figure: figure,
          };
          if (!checkChecker(checkProps))
            availableSquares.push({
              xCoo: chessMatrix[curX][curY + 2].position[0],
              yCoo: chessMatrix[curX][curY + 2].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY + 2],
              figureName: figure,
              capture: false,
              enPassant: true,
            });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[enPassantPossibility[0]][curY + 1].position[0],
            yCoo: chessMatrix[enPassantPossibility[0]][curY + 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [enPassantPossibility[0], curY + 1],
            figureName: figure,
            capture: true,
            enPassantPlayed: enPassantPossibility,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX + 1][curY + 1].position[0],
            yCoo: chessMatrix[curX + 1][curY + 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY + 1],
            figureName: figure,
            capture: true,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX - 1][curY + 1].position[0],
            yCoo: chessMatrix[curX - 1][curY + 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY + 1],
            figureName: figure,
            capture: true,
          });
      }
    }
  }

  if (checkForMate) {
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};

export const pawnBlackMoves = ({
  chessMatrix,
  curX,
  curY,
  figure,
  playerColor,
  enPassantPossibility,
  checkForMate = false,
}) => {
  const availableSquares = [];
  const opponentColor = playerColor === "white" ? "black" : "white";

  // Forward
  if (curY - 1 >= 0) {
    if (chessMatrix[curX][curY - 1].figure === "empty") {
      const checkProps = {
        tableLocationFrom: [curX, curY],
        tableLocation: [curX, curY - 1],
        opponentColor: opponentColor,
        chessMatrix: chessMatrix,
        figure: figure,
      };
      if (!checkChecker(checkProps))
        availableSquares.push({
          xCoo: chessMatrix[curX][curY - 1].position[0],
          yCoo: chessMatrix[curX][curY - 1].position[1],
          tableLocationFrom: [curX, curY],
          tableLocation: [curX, curY - 1],
          figureName: figure,
          capture: false,
        });
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
            figure: figure,
          };
          if (!checkChecker(checkProps))
            availableSquares.push({
              xCoo: chessMatrix[curX][curY - 2].position[0],
              yCoo: chessMatrix[curX][curY - 2].position[1],
              tableLocationFrom: [curX, curY],
              tableLocation: [curX, curY - 2],
              figureName: figure,
              capture: false,
              enPassant: true,
            });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[enPassantPossibility[0]][curY - 1].position[0],
            yCoo: chessMatrix[enPassantPossibility[0]][curY - 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [enPassantPossibility[0], curY - 1],
            figureName: figure,
            capture: true,
            enPassantPlayed: enPassantPossibility,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX - 1][curY - 1].position[0],
            yCoo: chessMatrix[curX - 1][curY - 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX - 1, curY - 1],
            figureName: figure,
            capture: true,
          });
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
          figure: figure,
        };
        if (!checkChecker(checkProps))
          availableSquares.push({
            xCoo: chessMatrix[curX + 1][curY - 1].position[0],
            yCoo: chessMatrix[curX + 1][curY - 1].position[1],
            tableLocationFrom: [curX, curY],
            tableLocation: [curX + 1, curY - 1],
            figureName: figure,
            capture: true,
          });
      }
    }
  }

  if (checkForMate) {
    return availableSquares.length;
  } else {
    return availableSquares;
  }
};
