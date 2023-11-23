import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useAnimate, stagger, useAnimation } from "framer-motion";

import useGame from "../store/useGame";

export default function LoadingScreen() {
  const { progress, total, loaded, item } = useProgress();

  const ready = useGame((state) => state.loaded);
  const setReady = useGame((state) => state.setLoaded);

  const started = useGame((state) => state.started);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (progress === 100) {
      const st = setTimeout(() => {
        setReady();
      }, 400);
    }
  }, [progress, total, loaded, item]);

  useEffect(() => {
    if (started) {
      animate([[".divS", { y: -10, x: 4 }, { duration: 0.4 }]]);
      animate(scope.current, { opacity: 0 }, { duration: 1, delay: 0.7 });
    }
  }, [started]);

  return (
    <div
      ref={scope}
      className={`fixed top-0 left-0 w-full h-full  flex items-center justify-center bg-stone-800 z-10 `}
    >
      <div className="text-4xl md:text-8xl font-bold text-zinc-300 relative mb-10 ">
        <div
          className="absolute top-0 left-0 overflow-hidden truncate text-clip transition-all duration-500 underline"
          style={{ width: `${progress}%` }}
        >
          CHESS 3D
        </div>
        {/* {!started && <div className="opacity-40">3D CHESS</div>} */}
        <div className="divS opacity-40">CHESS 3D</div>
        <PlayButton ready={ready} />
      </div>
    </div>
  );
}

const PlayButton = (props) => {
  const { ready } = props;
  const setStarted = useGame((state) => state.setStarted);

  const [scope, animate] = useAnimate();
  useEffect(() => {
    if (ready) {
      animate([
        [
          "button",
          { opacity: 100 },
          { delay: 0.2, duration: 0.8, ease: "linear" },
        ],
      ]);
    }
  }, [ready]);

  const onButtonClick = () => {
    animate([[".letter", { y: -40 }, { duration: 0.2, delay: stagger(0.05) }]]);
    setStarted();
  };

  return (
    <div
      className="absolute w-full p-6 flex justify-center items-start"
      ref={scope}
    >
      <button
        onClick={onButtonClick}
        className=" z-40 overflow-hidden bg-zinc-300 text-stone-800 text-3xl p-3 px-6 rounded-full opacity-0 
        truncate text-clip hover:bg-zinc-400 transition-colors"
      >
        <span aria-hidden className="block h-10 overflow-hidden">
          {["P", "L", "A", "Y"].map((letter, index) => (
            <span
              className="letter relative inline-block h-10 leading-8 after:absolute after:left-0 after:top-full after:h-10 after:content-[attr(data-letter)]"
              key={`${letter}-${index}`}
              data-letter={letter}
            >
              {letter}
            </span>
          ))}
        </span>
      </button>
    </div>
  );
};
