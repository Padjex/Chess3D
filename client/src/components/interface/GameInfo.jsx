import { motion } from "framer-motion";
import "../../css/InterfaceInGame.css";
import useGame from "../../store/useGame";

export default function GameInfo({ name }) {
  const players = useGame((state) => state.players);
  const readyOppnent = players.length;
  const opponentName = players.find((n) => n !== name);

  return (
    <>
      <motion.div
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
          transition: {
            duration: 0.8,
            delay: 0.6,
            type: "spring",
            mass: 5,
            stiffness: 450,
            damping: 50,
            restDelta: 0.0005,
          },
        }}
        className="wrapperIngame"
      >
        <div className="gameInforamtion">
          <div className="playerLeft">
            <div className="playerLeftName">{name}</div>
          </div>
          <div className="timeDiv">
            <div className="timeLeft">20:00</div>
            <div className="timeRight">20:00</div>
          </div>
          <div className="playerRight">
            <div className="playerRightName">
              {readyOppnent ? (
                opponentName
              ) : (
                <motion.div
                  className="spinner"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    type: "easeIn",
                    mass: 5,
                    stiffness: 450,
                    damping: 50,
                    restDelta: 0.0005,
                  }}
                ></motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      {/* Add that one player can choose the color of the figures.*/}
      {/* {readyOppnent !== 0 ? (
        <ChosseColor playarsNames={players} name={name} />
      ) : null} */}
    </>
  );
}
