import { AnimatePresence, motion } from "framer-motion";
import "../../css/contolButtons.css";
import useGame from "../../store/useGame";
import { useEffect, useState } from "react";

export default function ControlsButtons() {
  const onMove = useGame((state) => state.onMove);
  const opponentOnMove = useGame((state) => state.opponentOnMove);
  const onMoveConfirm = useGame((state) => state.onMoveConfirm);
  const onMoveUndo = useGame((state) => state.onMoveUndo);

  // need to change !!!
  const showControls = onMove === false && opponentOnMove === false;

  const confirmMove = () => {
    onMoveConfirm();
  };

  const undoMove = () => {
    onMoveUndo();
  };

  return (
    <>
      <AnimatePresence>
        {showControls && (
          <div className="controlsWrapper">
            <motion.button
              onClick={confirmMove}
              // onClick={showControls ? confirmMove : null}
              className="btnConfirmMove"
              initial={{
                x: 150,
              }}
              animate={{
                x: 0,
                transition: {
                  duration: 0.4,

                  type: "spring",
                  mass: 5,
                  stiffness: 450,
                  damping: 50,
                  restDelta: 0.0005,
                },
              }}
              exit={{
                x: 200,
                transition: {
                  duration: 0.3,
                  type: "spring",
                  mass: 5,
                  stiffness: 450,
                  damping: 50,
                  restDelta: 0.0005,
                },
              }}
            >
              &#10003;
            </motion.button>
            <motion.button
              onClick={undoMove}
              className="btnUndoMove"
              initial={{
                x: 150,
              }}
              animate={{
                x: 0,
                transition: {
                  duration: 0.4,
                  delay: 0.2,
                  type: "spring",
                  mass: 5,
                  stiffness: 450,
                  damping: 50,
                  restDelta: 0.0005,
                },
              }}
              exit={{
                x: 200,
                transition: {
                  duration: 0.3,
                  delay: 0.2,
                  type: "spring",
                  mass: 5,
                  stiffness: 450,
                  damping: 50,
                  restDelta: 0.0005,
                },
              }}
            >
              &#8634;
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
