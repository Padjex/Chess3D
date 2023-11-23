import { useEffect, useMemo } from "react";
import useGame from "../../store/useGame";
import { Pawn, King, Bishop, Knight, Rook, Queen } from "./Figures";

export default function SetGame({ whiteMaterial, blackMaterial }) {
  const chessMatrix = useGame((state) => state.chessMatrix);
  const setSquaresMatrix = useGame((state) => state.setSquaresMatrix);

  return (
    <>
      <SetWhiteKing
        material={whiteMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetBlackKing
        material={blackMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetWhiteQueen
        material={whiteMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetBlackQueen
        material={blackMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetWhitePawns
        material={whiteMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetBlackPawns
        material={blackMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetWhiteBishops
        material={whiteMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetBlackBishops
        material={blackMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetWhiteKnight
        material={whiteMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetBlackKnight
        material={blackMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetWhiteRook
        material={whiteMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
      <SetBlackRook
        material={blackMaterial}
        chessMatrix={chessMatrix}
        setSquaresMatrix={setSquaresMatrix}
      />
    </>
  );
}

////
//// SET WHITE KING
////
const SetWhiteKing = ({ material, chessMatrix, setSquaresMatrix }) => {
  const props = {
    positionX: chessMatrix[3][0].position[0],
    positionZ: chessMatrix[3][0].position[1],
    material: material,
    figureName: "king white",
  };
  chessMatrix[3][0].figure = "king white";
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return <King props={props} />;
};

////
//// SET BLACK KING
////
const SetBlackKing = ({ material, chessMatrix, setSquaresMatrix }) => {
  const props = {
    positionX: chessMatrix[3][7].position[0],
    positionZ: chessMatrix[3][7].position[1],
    material: material,
    figureName: "king black",
  };
  chessMatrix[3][7].figure = "king black";

  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);

  return <King props={props} />;
};

////
//// SET WHITE QUEEN
////
const SetWhiteQueen = ({ material, chessMatrix, setSquaresMatrix }) => {
  const props = {
    positionX: chessMatrix[4][0].position[0],
    positionZ: chessMatrix[4][0].position[1],
    material: material,
    figureName: "queen white",
  };
  chessMatrix[4][0].figure = "queen white";
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return <Queen props={props} />;
};

////
//// SET Black QUEEN
////
const SetBlackQueen = ({ material, chessMatrix, setSquaresMatrix }) => {
  const props = {
    positionX: chessMatrix[4][7].position[0],
    positionZ: chessMatrix[4][7].position[1],
    material: material,
    figureName: "queen black",
  };

  chessMatrix[4][7].figure = "queen black";
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return <Queen props={props} />;
};

////
//// SET WHITE PAWNS
////
const SetWhitePawns = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    for (let i = 0; i < 8; i++) {
      generateProps[i] = {
        positionX: chessMatrix[i][1].position[0],
        positionZ: chessMatrix[i][1].position[1],
        material: material,
        figureName: "white pawn " + i,
      };
      chessMatrix[i][1].figure = "white pawn " + i;
    }

    return generateProps;
  }, []);

  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);

  return (
    <>
      {generateProps.map((props, index) => (
        <Pawn key={index} props={props} />
      ))}
    </>
  );
};

////
//// SET BLACK PAWNS
////
const SetBlackPawns = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    for (let i = 0; i < 8; i++) {
      generateProps[i] = {
        positionX: chessMatrix[i][6].position[0],
        positionZ: chessMatrix[i][6].position[1],
        material: material,
        figureName: "black pawn " + i,
      };
      chessMatrix[i][6].figure = "black pawn " + i;
    }

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Pawn key={index} props={props} />
      ))}
    </>
  );
};

////
///// SET WHITE BISHOP
////
const SetWhiteBishops = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    generateProps[0] = {
      positionX: chessMatrix[2][0].position[0],
      positionZ: chessMatrix[2][0].position[1],
      material: material,
      figureName: "white bishop 0",
    };
    generateProps[1] = {
      positionX: chessMatrix[5][0].position[0],
      positionZ: chessMatrix[5][0].position[1],
      material: material,
      figureName: "white bishop 1",
    };
    chessMatrix[2][0].figure = "white bishop 0";
    chessMatrix[5][0].figure = "white bishop 1";

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Bishop key={index} props={props} />
      ))}
    </>
  );
};

////
///// SET BLACK BISHOP
////
const SetBlackBishops = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    generateProps[0] = {
      positionX: chessMatrix[2][7].position[0],
      positionZ: chessMatrix[2][7].position[1],
      material: material,
      figureName: "black bishop 0",
    };
    generateProps[1] = {
      positionX: chessMatrix[5][7].position[0],
      positionZ: chessMatrix[5][7].position[1],
      material: material,
      figureName: "black bishop 1",
    };
    chessMatrix[2][7].figure = "black bishop 0";
    chessMatrix[5][7].figure = "black bishop 1";

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Bishop key={index} props={props} />
      ))}
    </>
  );
};

////
///// SET WHITE KNIGHT
////
const SetWhiteKnight = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    generateProps[0] = {
      positionX: chessMatrix[1][0].position[0],
      positionZ: chessMatrix[1][0].position[1],
      material: material,
      figureName: "white knight 0",
    };
    generateProps[1] = {
      positionX: chessMatrix[6][0].position[0],
      positionZ: chessMatrix[6][0].position[1],
      material: material,
      figureName: "white knight 1",
    };
    chessMatrix[1][0].figure = "white knight 0";
    chessMatrix[6][0].figure = "white knight 1";

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Knight key={index} props={props} rotation={Math.PI} />
      ))}
    </>
  );
};

////
///// SET BLACK KNIGHT
////
const SetBlackKnight = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    generateProps[0] = {
      positionX: chessMatrix[1][7].position[0],
      positionZ: chessMatrix[1][7].position[1],
      material: material,
      figureName: "black knight 0",
    };
    generateProps[1] = {
      positionX: chessMatrix[6][7].position[0],
      positionZ: chessMatrix[6][7].position[1],
      material: material,
      figureName: "black knight 1",
    };
    chessMatrix[1][7].figure = "black knight 0";
    chessMatrix[6][7].figure = "black knight 1";

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Knight key={index} props={props} />
      ))}
    </>
  );
};

////
///// SET WHITE ROOK
////
const SetWhiteRook = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    generateProps[0] = {
      positionX: chessMatrix[0][0].position[0],
      positionZ: chessMatrix[0][0].position[1],
      material: material,
      figureName: "white rook 0",
    };
    generateProps[1] = {
      positionX: chessMatrix[7][0].position[0],
      positionZ: chessMatrix[7][0].position[1],
      material: material,
      figureName: "white rook 1",
    };
    chessMatrix[0][0].figure = "white rook 0";
    chessMatrix[7][0].figure = "white rook 1";

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Rook key={index} props={props} />
      ))}
    </>
  );
};

////
///// SET BLACK ROOK
////
const SetBlackRook = ({ material, chessMatrix, setSquaresMatrix }) => {
  const generateProps = useMemo(() => {
    const generateProps = [];
    generateProps[0] = {
      positionX: chessMatrix[0][7].position[0],
      positionZ: chessMatrix[0][7].position[1],
      material: material,
      figureName: "black rook 0",
    };
    generateProps[1] = {
      positionX: chessMatrix[7][7].position[0],
      positionZ: chessMatrix[7][7].position[1],
      material: material,
      figureName: "black rook 1",
    };
    chessMatrix[0][7].figure = "black rook 0";
    chessMatrix[7][7].figure = "black rook 1";

    return generateProps;
  }, []);
  useEffect(() => {
    setSquaresMatrix(chessMatrix);
  }, []);
  return (
    <>
      {generateProps.map((props, index) => (
        <Rook key={index} props={props} />
      ))}
    </>
  );
};
