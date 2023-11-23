import { create } from "zustand";
import io from "socket.io-client";

export default create((set, get) => {
  ////
  /////// SOCKET IO
  ////
  const socket = io.connect("http://localhost:3001");

  socket.on("room_joined", (room) => {
    set({ room: room });
  });

  socket.on("start_game", (data) => {
    set({ players: data.playarsNames });

    if (data.firstMove === get().playerName) {
      set({
        playerColor: "white",
        opponentColor: "black",
        onMove: true,
        opponentOnMove: false,
      });
    } else {
      set({
        playerColor: "black",
        opponentColor: "white",
        opponentOnMove: true,
      });
    }

    socket.on("opponent_move", (data) => {
      const { moveData } = data;

      const currentMatrix = get().chessMatrix;

      const { newMatrix, captured } = updateMatrix(
        currentMatrix,
        moveData.tableLocationTo,
        moveData.figure,
        moveData.castling,
        moveData.enPassantPlayed
      );

      const x = moveData.tableLocationTo[0];
      const y = moveData.tableLocationTo[1];
      const move = newMatrix[x][y];

      const opponentMove = {
        figure: moveData.figure,
        tableLocationFrom: moveData.tableLocationFrom,
        tableLocationTo: moveData.tableLocationTo,
        captured: moveData.captured,
        castling: moveData.castling,
      };
      if (moveData.enPassantPlayed) {
        opponentMove.enPassantPlayed = moveData.enPassantPlayed;
      }

      const newStates = {
        chessMatrix: newMatrix,
        applyMove: move,
        opponentMove: [...get().opponentMoves, opponentMove],
        opponentOnMove: false,
        onMove: true,
      };

      if (captured !== "empty") {
        newStates.applyCapture = [...get().applyCapture, captured];
      }

      if (moveData.enPassant) {
        newStates.enPassantPossibility = [x, y];
      }

      if (moveData.castling) {
        const applyCastling = {};
        const opponentColor = get().opponentColor;
        let positionY = 0;
        if (opponentColor === "black") {
          positionY = 7;
        }
        if (moveData.castling.includes("Queen")) {
          applyCastling.figure = opponentColor + " rook 1";
          applyCastling.position = newMatrix[3][positionY].position;
          newStates.applyCastling = applyCastling;
        } else {
          applyCastling.figure = opponentColor + " rook 0";
          applyCastling.position = newMatrix[3][positionY].position;
          newStates.applyCastling = applyCastling;
        }
      }

      set(newStates);
    });
  });

  socket.on("room_full", () => {
    console.log("room is full");
  });

  // Generate matrix with squares positions
  const generateChessMatrix = () => {
    const squares = [];
    for (let i = 0; i < 8; i++) {
      let squaresArray = [];
      for (let y = 0; y < 8; y++) {
        squaresArray.push({
          tableLocation: [i, y],
          position: [0.814 - 0.23225 * i, -0.814 + 0.23225 * y],
          figure: "empty",
        });
      }
      squares.push(squaresArray);
    }

    return squares;
  };
  const initalMatrix = generateChessMatrix();

  // Update matrix for each move
  const updateMatrix = (
    currentMatrix,
    newMove,
    figureName,
    castling,
    enPassantPlayed
  ) => {
    const xT = newMove[0];
    const yT = newMove[1];
    const newMatrix = currentMatrix;

    let playerColor = "white";

    if (figureName.includes("black")) {
      playerColor = "black";
    }

    let captured = "empty";

    const currentField = newMatrix
      .flat()
      .find((square) => square.figure === figureName);

    if (castling) {
      if (castling.includes("Queen")) {
        currentField.figure = playerColor + " rook 1";
      } else {
        currentField.figure = playerColor + " rook 0";
      }
    } else {
      currentField.figure = "empty";
      if (enPassantPlayed) {
        let y = playerColor === "white" ? -1 : 1;
        captured = newMatrix[xT][yT + y].figure;
      } else {
        captured = newMatrix[xT][yT].figure;
      }
    }
    newMatrix[xT][yT].figure = figureName;

    return { newMatrix, captured };
  };

  return {
    playerName: "",
    // It's not false only when the player creates a room
    room: false,
    setRoom: (data) => {
      socket.emit("join_make_room", data);
      set({ playerName: data.name });
    },

    // It's not empty only if both players are in the room
    players: [],

    loaded: false,
    setLoaded: () => set(() => ({ loaded: true })),

    // when start button is pressed started is true
    started: false,
    setStarted: () => set(() => ({ started: true })),

    //  Only if both players are in the room, this is not null
    playerColor: "null",
    opponentColor: "null",

    chessMatrix: initalMatrix,
    // setSquaresMatrix for setGame, to add all figures on matrix
    setSquaresMatrix: (newSquares) => set({ chessMatrix: newSquares }),

    // activeFigure for click on playar's figures
    activeFigure: "empty",
    setActiveFigure: (figure) => set({ activeFigure: figure }),
    deactivateFigure: () => set({ activeFigure: "empty" }),

    // The final array of player's moves
    playerMoves: [],

    // The final array of opponent's moves
    opponentMoves: [],

    // All caprute for opponent figure
    applyCapture: [],

    // The available square, when clicked, contains information about the move and the position of the piece that needs to be moved.
    applyMove: false,

    applyCastling: false,

    // For castling
    kingMoved: false,
    rook0Moved: false,
    rook1Moved: false,
    castlingKingSide: true,
    castlingQueenSide: true,

    // En passant
    enPassantPossibility: false,

    setApplyMove: (
      tableLocationTo,
      figureName,
      tableLocationFrom,
      castling,
      enPassant,
      enPassantPlayed
    ) => {
      const currentMatrix = get().chessMatrix;
      const { newMatrix, captured } = updateMatrix(
        currentMatrix,
        tableLocationTo,
        figureName,
        castling,
        enPassantPlayed
      );
      const x = tableLocationTo[0];
      const y = tableLocationTo[1];
      const move = newMatrix[x][y];

      const playarMove = {
        figure: figureName,
        tableLocationFrom: tableLocationFrom,
        tableLocationTo: tableLocationTo,
        captured: captured,
        castling: castling,
      };

      if (enPassant) {
        playarMove.enPassant = enPassant;
      }
      if (enPassantPlayed) {
        playarMove.enPassantPlayed = enPassantPlayed;
      }

      // OVDE DODATI KOD ZA PROVERU SAHA, AKO VRATI TRUE, ONDA NE POZVATI FUNKCIJU SET, ILI KORISTITI SETTIMEOUT

      const newStates = {
        applyMove: move,
        chessMatrix: newMatrix,
        activeFigure: "empty",

        playerMoves: [...get().playerMoves, playarMove],
        onMove: false,
      };

      if (captured !== "empty") {
        newStates.applyCapture = [...get().applyCapture, captured];
      }

      // CASTLING
      if (castling) {
        const applyCastling = {};
        const playerColor = get().playerColor;
        let positionY = 0;
        if (playerColor === "black") {
          positionY = 7;
        }
        if (castling.includes("Queen")) {
          applyCastling.figure = playerColor + " rook 1";

          applyCastling.position = newMatrix[3][positionY].position;
          newStates.applyCastling = applyCastling;
        } else {
          applyCastling.figure = playerColor + " rook 0";

          applyCastling.position = newMatrix[3][positionY].position;
          newStates.applyCastling = applyCastling;
        }
      }

      if (figureName.includes("king") && !get().kingMoved) {
        newStates.kingMoved = true;
      }
      if (figureName.includes("rook 0") && !get().rook0Moved) {
        newStates.rook0Moved = true;
      }
      if (figureName.includes("rook 1") && !get().rook1Moved) {
        newStates.rook1Moved = true;
      }

      set(newStates);
    },

    // When it's the player's turn, onMove is true
    onMove: false,
    // When it's the opponet's turn, opponentOnMove is true
    // for ControlButton.jsx
    opponentOnMove: true,

    // A method that is called when the user presses the confirm button
    // The confirm button is only available if the player has already made a move
    onMoveConfirm: () => {
      const room = get().room;
      const playerMoves = get().playerMoves;
      const playerMove = playerMoves[playerMoves.length - 1];

      const data = {
        moveData: playerMove,
        room: room,
      };
      socket.emit("player_move", data);

      const newStates = {
        onMove: false,
        // applyMove: false,
        opponentOnMove: true,
        enPassantPossibility: false,
      };

      // CASTLING
      if (playerMove.figure.includes("king")) {
        if (get().castlingKingSide) newStates.castlingKingSide = false;
        if (get().castlingQueenSide) newStates.castlingQueenSide = false;
      }

      if (playerMove.figure.includes("rook 0") && get().castlingKingSide) {
        newStates.castlingKingSide = false;
      }
      if (playerMove.figure.includes("rook 1") && get().castlingQueenSide) {
        newStates.castlingQueenSide = false;
      }

      set(newStates);
    },

    applyUndoCaptured: false,

    onMoveUndo: () => {
      const currentMatrix = get().chessMatrix;
      const playerMoves = get().playerMoves;
      const moveToUndo = playerMoves[playerMoves.length - 1];

      const previusTableLocation = moveToUndo.tableLocationFrom;
      const figureName = moveToUndo.figure;

      const x = previusTableLocation[0];
      const y = previusTableLocation[1];

      const previousPosition = currentMatrix[x][y].position;

      const { newMatrix } = updateMatrix(
        currentMatrix,
        previusTableLocation,
        figureName,
        moveToUndo.castling
      );

      const previousMove = {
        tableLocation: previusTableLocation,
        position: previousPosition,
        figure: figureName,
      };

      playerMoves.pop();

      const newStates = {
        onMove: true,
        chessMatrix: newMatrix,
        applyMove: previousMove,
        playerMoves: playerMoves,
      };

      if (moveToUndo.captured !== "empty") {
        let x = moveToUndo.tableLocationTo[0];
        let y = moveToUndo.tableLocationTo[1];

        if (moveToUndo.enPassantPlayed) {
          x = moveToUndo.enPassantPlayed[0];
          y = moveToUndo.enPassantPlayed[1];
        }

        const capturedFigures = get().applyCapture;
        const length = capturedFigures.length - 1;
        const figure = capturedFigures[length];

        newMatrix[x][y].figure = figure;

        const position = currentMatrix[x][y].position;

        capturedFigures.pop();
        newStates.applyCapture = capturedFigures;
        newStates.applyUndoCaptured = {
          position: position,
          figure: figure,
        };
      }

      // CASTLING
      if (moveToUndo.castling) {
        const applyCastling = {};
        const playerColor = get().playerColor;
        let positionY = 0;
        if (playerColor === "black") {
          positionY = 7;
        }
        if (moveToUndo.castling.includes("Queen")) {
          applyCastling.figure = playerColor + " rook 1";
          applyCastling.position = newMatrix[7][positionY].position;
          newStates.applyCastling = applyCastling;
        } else {
          applyCastling.figure = playerColor + " rook 0";
          applyCastling.position = newMatrix[0][positionY].position;
          newStates.applyCastling = applyCastling;
        }
        applyCastling.undo = true;
      }

      if (figureName.includes("king") && get().kingMoved) {
        newStates.kingMoved = false;
      }
      if (
        figureName.includes("rook 0") &&
        get().castlingKingSide &&
        get().rook0Moved
      ) {
        newStates.rook1Moved = false;
      }
      if (
        figureName.includes("rook 1") &&
        get().castlingQueenSide &&
        get().rook1Moved
      ) {
        newStates.rook0Moved = false;
      }

      set(newStates);
    },
  };
});
