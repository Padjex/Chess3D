import useGame from "../../store/useGame";
import { AttackedSquare } from "./AttackedSquare";

export const checkChecker = (checkProps) => {
  const {
    chessMatrix,
    opponentColor,
    tableLocation,
    tableLocationFrom,
    figure,
  } = checkProps;
  chessMatrix[0][1].figure = "dad";
  // console.log("1");
  // console.log(JSON.parse(JSON.stringify();))
  // const chessMat = ches
  // console.log(chessMat);
  let testObject = JSON.parse(JSON.stringify(chessMatrix));
  const curX = tableLocationFrom[0];
  const curY = tableLocationFrom[1];

  const posX = tableLocation[0];
  const posY = tableLocation[1];

  testObject[curX][curY].figure = "empty";
  testObject[posX][posY].figure = figure;
  // console.log(testObject);

  return false;
};
