import { useState } from "react";
import "../../css/interface.css";
import { AnimatePresence, motion } from "framer-motion";
import useGame from "../../store/useGame";
import GameInfo from "./GameInfo";

export default function Interface() {
  const [name, setName] = useState("");
  const [roomName, setRoomName] = useState("");

  const setRoom = useGame((state) => state.setRoom);
  const room = useGame((state) => state.room);

  const findMakeRoom = () => {
    if (name !== "" && roomName !== "") {
      const data = { name: name, room: roomName };
      setRoom(data);
    }
  };

  return (
    <>
      {room && <GameInfo name={name} />}
      <AnimatePresence>
        {!room && (
          <div className="wrapper">
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,

                transition: {
                  duration: 0.8,
                  delay: 1,
                  type: "spring",
                  mass: 5,
                  stiffness: 450,
                  damping: 50,
                  restDelta: 0.0005,
                },
              }}
              exit={{
                y: window.innerHeight,
                transition: {
                  duration: 1.4,
                  delay: 0.4,
                  type: "spring",
                  mass: 5,
                  stiffness: 450,
                  damping: 50,
                  restDelta: 0.0005,
                },
              }}
              className="interface"
            >
              <h1 className="title">CHESS</h1>
              <div className="menuWrapper">
                <div className="menuLeft menu">
                  <h2>Play with friend</h2>
                  <input
                    id="2"
                    placeholder="your name..."
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <input
                    id="1"
                    placeholder="room name..."
                    onChange={(e) => {
                      setRoomName(e.target.value);
                    }}
                  />
                  <button onClick={findMakeRoom}>find/make room</button>
                </div>
                <div className="menuRight menu">
                  <h2>Find player</h2>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
