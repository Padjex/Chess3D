//****
//// Attacked square ?
//****
export const AttackedSquare = (
  x,
  y,
  chessMatrix,
  opponentColor,
  figureToCheck
) => {
  const playerColor = opponentColor === "white" ? "black" : "white";

  //
  // FORWARD(Queen, Rook) attacked ?
  //
  for (let i = y + 1; i < chessMatrix.length; i++) {
    const figure = chessMatrix[x][i].figure;
    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("rook")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }
  // //
  // // BACK(Queen, Rook) attacked ?
  // //
  for (let i = y - 1; i >= 0; i--) {
    const figure = chessMatrix[x][i].figure;
    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("rook")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }
  // //
  // // RIGHT(Queen, Rook) attacked ?
  // //
  for (let i = x + 1; i < chessMatrix.length; i++) {
    const figure = chessMatrix[i][y].figure;
    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("rook")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }
  // //
  // // LEFT(Queen, Rook) attacked ?
  // //
  for (let i = x - 1; i >= 0; i--) {
    const figure = chessMatrix[i][y].figure;
    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("rook")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }

  //
  // FORWARD RIGHT(Queen, Bishop) attacked ?
  //
  const endTableFR = Math.max(x, y);
  for (let i = 1; i < chessMatrix.length - endTableFR; i++) {
    const figure = chessMatrix[x + i][y + i].figure;
    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("bishop")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }

  //
  // FORWARD LEFT(Queen, Bishop) attacked ?
  //
  let endTableFL;
  if (x >= 7 - y) {
    endTableFL = 7 - y;
  } else {
    endTableFL = x;
  }
  for (let i = 1; i < endTableFL + 1; i++) {
    const figure = chessMatrix[x - i][y + i].figure;
    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("bishop")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }

  //
  // BACK RIGHT(Queen, Bishop) attacked ?
  //
  let endTableBR;
  if (y >= 7 - x) {
    endTableBR = 7 - x;
  } else {
    endTableBR = y;
  }

  for (let i = 1; i < endTableBR + 1; i++) {
    const figure = chessMatrix[x + i][y - i].figure;

    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("bishop")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }
  //
  // BACK LEFT(Queen, Bishop) attacked ?
  //
  const endTableBL = Math.min(x, y);

  for (let i = 1; i < endTableBL + 1; i++) {
    const figure = chessMatrix[x - i][y - i].figure;

    if (figure !== "empty") {
      if (figure.includes(opponentColor)) {
        if (figure.includes("queen") || figure.includes("bishop")) {
          return true;
        } else {
          break;
        }
      } else {
        if (figure === figureToCheck) {
          continue;
        } else {
          break;
        }
      }
    }
  }

  //
  // KNIGHT attacked ?
  //
  // Forward
  if (y + 2 < 8) {
    // right
    if (x + 1 < 8) {
      if (chessMatrix[x + 1][y + 2].figure.includes(opponentColor))
        if (chessMatrix[x + 1][y + 2].figure.includes("knight")) {
          return true;
        }
    }
    // left
    if (x - 1 >= 0) {
      if (chessMatrix[x - 1][y + 2].figure.includes(opponentColor))
        if (chessMatrix[x - 1][y + 2].figure.includes("knight")) {
          return true;
        }
    }
  }

  // // Right
  if (x + 2 < 8) {
    // forward
    if (y + 1 < 8) {
      if (chessMatrix[x + 2][y + 1].figure.includes(opponentColor))
        if (chessMatrix[x + 2][y + 1].figure.includes("knight")) {
          return true;
        }
    }
    // back
    if (y - 1 >= 0) {
      if (chessMatrix[x + 2][y - 1].figure.includes(opponentColor))
        if (chessMatrix[x + 2][y - 1].figure.includes("knight")) {
          return true;
        }
    }
  }

  // // Back
  if (y - 2 >= 0) {
    // right
    if (x + 1 < 8) {
      if (chessMatrix[x + 1][y - 2].figure.includes(opponentColor))
        if (chessMatrix[x + 1][y - 2].figure.includes("knight")) {
          return true;
        }
    }
    // left
    if (x - 1 >= 0) {
      if (chessMatrix[x - 1][y - 2].figure.includes(opponentColor))
        if (chessMatrix[x - 1][y - 2].figure.includes("knight")) {
          return true;
        }
    }
  }

  // // Left
  if (x - 2 >= 0) {
    // forward
    if (y + 1 < 8) {
      if (chessMatrix[x - 2][y + 1].figure.includes(opponentColor))
        if (chessMatrix[x - 2][y + 1].figure.includes("knight")) {
          return true;
        }
    }
    // back
    if (y - 1 >= 0) {
      if (chessMatrix[x - 2][y - 1].figure.includes(opponentColor))
        if (chessMatrix[x - 2][y - 1].figure.includes("knight")) {
          return true;
        }
    }
  }

  //
  // PAWN black attacked ?
  //
  if (playerColor === "white") {
    if (y + 1 < 8) {
      if (x + 1 < 8) {
        if (chessMatrix[x + 1][y + 1].figure.includes(opponentColor)) {
          if (chessMatrix[x + 1][y + 1].figure.includes("pawn")) {
            return true;
          }
        }
      }
      if (x - 1 >= 0) {
        if (chessMatrix[x - 1][y + 1].figure.includes(opponentColor)) {
          if (chessMatrix[x - 1][y + 1].figure.includes("pawn")) {
            return true;
          }
        }
      }
    }
  }
  //
  // PAWN white attacked ?
  //
  if (playerColor === "black") {
    if (y - 1 >= 0) {
      if (x + 1 < 8) {
        if (chessMatrix[x + 1][y - 1].figure.includes(opponentColor)) {
          if (chessMatrix[x + 1][y - 1].figure.includes("pawn")) {
            return true;
          }
        }
      }
      if (x - 1 >= 0) {
        if (chessMatrix[x - 1][y - 1].figure.includes(opponentColor)) {
          if (chessMatrix[x - 1][y - 1].figure.includes("pawn")) {
            return true;
          }
        }
      }
    }
  }

  //
  // KING attacked ?
  //

  // Forward
  if (y + 1 < 8) {
    if (chessMatrix[x][y + 1].figure.includes("king " + opponentColor)) {
      return true;
    }
    // right
    if (x + 1 < 8) {
      if (chessMatrix[x + 1][y + 1].figure.includes("king " + opponentColor)) {
        return true;
      }
    }
    // left
    if (x - 1 >= 0) {
      if (chessMatrix[x - 1][y + 1].figure.includes("king " + opponentColor)) {
        return true;
      }
    }
  }
  // Back
  if (y - 1 >= 0) {
    if (chessMatrix[x][y - 1].figure.includes("king " + opponentColor)) {
      return true;
    }
    // right
    if (x + 1 < 8) {
      if (chessMatrix[x + 1][y - 1].figure.includes("king " + opponentColor)) {
        return true;
      }
    }
    // left
    if (x - 1 >= 0) {
      if (chessMatrix[x - 1][y - 1].figure.includes("king " + opponentColor)) {
        return true;
      }
    }
  }
  // Right
  if (x + 1 < 8) {
    if (chessMatrix[x + 1][y].figure.includes("king " + opponentColor)) {
      return true;
    }
  }
  // Left
  if (x - 1 >= 0) {
    if (chessMatrix[x - 1][y].figure.includes("king " + opponentColor)) {
      return true;
    }
  }

  return false;
};
