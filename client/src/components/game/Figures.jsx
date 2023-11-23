import { useGLTF } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import gsap from "gsap";
import useGame from "../../store/useGame";
import { useEffect, useMemo, useRef, useState } from "react";

export const Pawn = ({ props }) => {
  const { material, positionX, positionZ, figureName } = props;
  const { nodes } = useGLTF("./blender/figures/pawn.glb");

  const setActiveFigure = useGame((state) => state.setActiveFigure);

  // to update only figures of playar
  const playerColor = useGame((state) => state.playerColor);
  const playerFigure = figureName.includes(playerColor);

  const onMove = useGame((state) => state.onMove);

  const availableClick = playerFigure === true && onMove === true;

  const delay = figureName.charAt(figureName.length - 1);

  const pawnGroupRef = useRef();

  const applyMove = useGame((state) => state.applyMove);

  const applyCapture = useGame((state) => state.applyCapture);

  const applyUndoCaptured = useGame((state) => state.applyUndoCaptured);

  useEffect(() => {
    if (applyUndoCaptured) {
      if (applyUndoCaptured.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(pawnGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(pawnGroupRef.current.rotation, {
          x: 0,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(pawnGroupRef.current.position, {
          x: applyUndoCaptured.position[0],
          z: applyUndoCaptured.position[1],
          ease: "circ.out",
        });
        tl.to(pawnGroupRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
    }
  }, [applyUndoCaptured]);

  // apply move
  useEffect(() => {
    if (applyMove) {
      if (applyMove.figure === figureName) {
        let tl = gsap.timeline();

        tl.to(pawnGroupRef.current.position, {
          x: applyMove.position[0],
          z: applyMove.position[1],
          ease: "circ.out",
        });
      }
    }
  }, [applyMove, applyCapture]);

  // apply capture for opponent figures
  useEffect(() => {
    if (applyCapture) {
      const length = applyCapture.length - 1;
      if (applyCapture[length] === figureName) {
        let finalX = -1.34;
        let xMultiplier = -0.2;
        let color = "black";
        if (applyCapture[length].includes("white")) {
          color = "white";
          finalX = 1.34;
          xMultiplier = 0.2;
        }
        const lengthColor = applyCapture.filter((figure) =>
          figure.includes(color)
        ).length;

        let row = 0;
        if (lengthColor > 7) {
          row = 1;
        }
        let tl = gsap.timeline();
        tl.to(pawnGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(pawnGroupRef.current.rotation, {
          x: Math.PI * 2,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(pawnGroupRef.current.position, {
          x: finalX + xMultiplier * row,
          z: 0.64 - 0.19 * lengthColor + (7 * 0.19 + 0.095) * row,
          ease: "circ.out",
          duration: 0.45,
        });
        tl.to(pawnGroupRef.current.position, {
          y: 0.38,
          duration: 0.15,
        });
      }
    }
  }, [applyCapture]);

  return (
    <>
      <group ref={pawnGroupRef} position={[positionX, 0.5, positionZ]}>
        <motion.mesh
          initial={{
            y: 3,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 1.6 + 0.28 - delay * 0.04,
            duration: 0.64,
          }}
          onClick={
            availableClick
              ? (event) => {
                  event.stopPropagation();
                  setActiveFigure(figureName);
                }
              : null
          }
          castShadow
          geometry={nodes.PawnW.geometry}
          material={material}
          scale={0.038}
        />
      </group>
    </>
  );
};

export const Knight = ({ props, rotation }) => {
  const { material, positionX, positionZ, figureName } = props;
  const { nodes } = useGLTF("./blender/figures/knight.glb");
  const setActiveFigure = useGame((state) => state.setActiveFigure);
  const playerColor = useGame((state) => state.playerColor);
  const playerFigure = figureName.includes(playerColor);

  // For intial animation
  const numFigure = figureName.charAt(figureName.length - 1);
  const delay = numFigure == 0 ? 0.04 : 0.24;

  const onMove = useGame((state) => state.onMove);

  const availableClick = playerFigure === true && onMove === true;

  const knighGrouptRef = useRef();

  const applyMove = useGame((state) => state.applyMove);

  const applyCapture = useGame((state) => state.applyCapture);
  const applyUndoCaptured = useGame((state) => state.applyUndoCaptured);

  useEffect(() => {
    if (applyUndoCaptured) {
      if (applyUndoCaptured.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(knighGrouptRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(knighGrouptRef.current.rotation, {
          x: 0,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(knighGrouptRef.current.position, {
          x: applyUndoCaptured.position[0],
          z: applyUndoCaptured.position[1],
          ease: "circ.out",
        });
        tl.to(knighGrouptRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
    }
  }, [applyUndoCaptured]);

  // apply move for player figures
  useEffect(() => {
    if (applyMove) {
      if (applyMove.figure === figureName) {
        let tl = gsap.timeline();

        tl.to(knighGrouptRef.current.position, {
          y: 0.79,
          ease: "circ.out",

          duration: 0.35,
        });
        tl.to(knighGrouptRef.current.position, {
          x: applyMove.position[0],
          z: applyMove.position[1],
          ease: "circ.out",
          duration: 0.45,
        });
        tl.to(knighGrouptRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
    }
  }, [applyMove, applyCapture]);

  // apply capture for opponent figures
  useEffect(() => {
    if (applyCapture) {
      const length = applyCapture.length - 1;
      if (applyCapture[length] === figureName) {
        let finalX = -1.34;
        let xMultiplier = -0.2;
        let color = "black";
        if (applyCapture[length].includes("white")) {
          color = "white";
          finalX = 1.34;
          xMultiplier = 0.2;
        }
        const lengthColor = applyCapture.filter((figure) =>
          figure.includes(color)
        ).length;
        var tl = gsap.timeline();
        let row = 0;
        if (lengthColor > 7) {
          row = 1;
        }

        tl.to(knighGrouptRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(knighGrouptRef.current.rotation, {
          x: Math.PI * 2,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(knighGrouptRef.current.position, {
          x: finalX + xMultiplier * row,
          z: 0.64 - 0.19 * lengthColor + (7 * 0.19 + 0.095) * row,
          ease: "circ.out",
          duration: 0.45,
        });
        tl.to(knighGrouptRef.current.position, {
          y: 0.38,
          duration: 0.15,
        });
      }
    }
  }, [applyCapture]);

  return (
    <>
      <group ref={knighGrouptRef} position={[positionX, 0.5, positionZ]}>
        <motion.mesh
          initial={{
            y: 3,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 1.2 + delay,
            duration: 0.7,
          }}
          onClick={
            availableClick
              ? (event) => {
                  event.stopPropagation();
                  setActiveFigure(figureName);
                }
              : null
          }
          castShadow
          geometry={nodes.Knight.geometry}
          material={material}
          scale={0.043}
          rotation-y={rotation}
        />
      </group>
    </>
  );
};

export const Queen = ({ props }) => {
  const { material, positionX, positionZ, figureName } = props;
  const { nodes } = useGLTF("./blender/figures/queen.glb");
  const playerColor = useGame((state) => state.playerColor);
  const setActiveFigure = useGame((state) => state.setActiveFigure);
  const playerFigure = figureName.includes(playerColor);

  const onMove = useGame((state) => state.onMove);

  const availableClick = playerFigure === true && onMove === true;

  const queenGroupRef = useRef();

  const applyMove = useGame((state) => state.applyMove);

  const applyCapture = useGame((state) => state.applyCapture);
  const applyUndoCaptured = useGame((state) => state.applyUndoCaptured);

  useEffect(() => {
    if (applyUndoCaptured) {
      if (applyUndoCaptured.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(queenGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(queenGroupRef.current.rotation, {
          x: 0,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(queenGroupRef.current.position, {
          x: applyUndoCaptured.position[0],
          z: applyUndoCaptured.position[1],
          ease: "circ.out",
        });
        tl.to(queenGroupRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
    }
  }, [applyUndoCaptured]);

  // apply move
  useEffect(() => {
    if (applyMove) {
      if (applyMove.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(queenGroupRef.current.position, {
          x: applyMove.position[0],
          z: applyMove.position[1],
          y: 0.5,
          ease: "circ.out",
        });
      }
    }
  }, [applyMove, applyCapture]);

  // apply capture for opponent figures
  useEffect(() => {
    if (applyCapture) {
      const length = applyCapture.length - 1;
      if (applyCapture[length] === figureName) {
        let finalX = -1.34;
        let xMultiplier = -0.2;
        let color = "black";
        if (applyCapture[length].includes("white")) {
          color = "white";
          finalX = 1.34;
          xMultiplier = 0.2;
        }
        const lengthColor = applyCapture.filter((figure) =>
          figure.includes(color)
        ).length;
        var tl = gsap.timeline();
        let row = 0;
        if (lengthColor > 7) {
          row = 1;
        }

        tl.to(queenGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(queenGroupRef.current.rotation, {
          x: Math.PI * 2,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(queenGroupRef.current.position, {
          x: finalX + xMultiplier * row,
          z: 0.64 - 0.19 * lengthColor + (7 * 0.19 + 0.095) * row,
          ease: "circ.out",
          duration: 0.45,
        });
        tl.to(queenGroupRef.current.position, {
          y: 0.38,
          duration: 0.15,
        });
      }
    }
  }, [applyCapture]);

  return (
    <>
      <group ref={queenGroupRef} position={[positionX, 0.5, positionZ]}>
        <motion.mesh
          initial={{
            y: 3,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 1.2 + 0.16,
            duration: 0.7,
          }}
          onClick={
            availableClick
              ? (event) => {
                  event.stopPropagation();
                  setActiveFigure(figureName);
                }
              : null
          }
          castShadow
          geometry={nodes.Queen.geometry}
          material={material}
          scale={0.0354}
        />
      </group>
    </>
  );
};

export const Bishop = ({ props }) => {
  const { material, positionX, positionZ, figureName } = props;
  const { nodes } = useGLTF("./blender/figures/bishop.glb");
  const setActiveFigure = useGame((state) => state.setActiveFigure);
  const playerColor = useGame((state) => state.playerColor);
  const playerFigure = figureName.includes(playerColor);

  const onMove = useGame((state) => state.onMove);

  const availableClick = playerFigure === true && onMove === true;

  // For inital animation
  const numFigure = figureName.charAt(figureName.length - 1);
  const delay = numFigure == 0 ? 0.08 : 0.2;

  const bishopGroupRef = useRef();

  const applyMove = useGame((state) => state.applyMove);

  const applyCapture = useGame((state) => state.applyCapture);
  const applyUndoCaptured = useGame((state) => state.applyUndoCaptured);

  useEffect(() => {
    if (applyUndoCaptured) {
      if (applyUndoCaptured.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(bishopGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(bishopGroupRef.current.rotation, {
          x: 0,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(bishopGroupRef.current.position, {
          x: applyUndoCaptured.position[0],
          z: applyUndoCaptured.position[1],
          ease: "circ.out",
        });
        tl.to(bishopGroupRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
    }
  }, [applyUndoCaptured]);

  // apply move
  useEffect(() => {
    if (applyMove) {
      if (applyMove.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(bishopGroupRef.current.position, {
          x: applyMove.position[0],
          z: applyMove.position[1],
          y: 0.5,
          ease: "circ.out",
        });
      }
    }
  }, [applyMove, applyCapture]);

  // apply capture for opponent figures
  useEffect(() => {
    if (applyCapture) {
      const length = applyCapture.length - 1;
      if (applyCapture[length] === figureName) {
        let finalX = -1.34;
        let xMultiplier = -0.2;
        let color = "black";
        if (applyCapture[length].includes("white")) {
          color = "white";
          finalX = 1.34;
          xMultiplier = 0.2;
        }
        const lengthColor = applyCapture.filter((figure) =>
          figure.includes(color)
        ).length;
        var tl = gsap.timeline();
        let row = 0;
        if (lengthColor > 7) {
          row = 1;
        }

        tl.to(bishopGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(bishopGroupRef.current.rotation, {
          x: Math.PI * 2,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(bishopGroupRef.current.position, {
          x: finalX + xMultiplier * row,
          z: 0.64 - 0.19 * lengthColor + (7 * 0.19 + 0.095) * row,
          ease: "circ.out",
          duration: 0.45,
        });
        tl.to(bishopGroupRef.current.position, {
          y: 0.38,
          duration: 0.15,
        });
      }
    }
  }, [applyCapture]);

  return (
    <>
      <group ref={bishopGroupRef} position={[positionX, 0.5, positionZ]}>
        <motion.mesh
          initial={{
            y: 3,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 1.2 + delay,
            duration: 0.7,
          }}
          onClick={
            availableClick
              ? (event) => {
                  event.stopPropagation();
                  setActiveFigure(figureName);
                }
              : null
          }
          castShadow
          geometry={nodes.bishop.geometry}
          material={material}
          scale={0.034}
        />
      </group>
    </>
  );
};

export const Rook = ({ props }) => {
  const { material, positionX, positionZ, figureName } = props;
  const { nodes } = useGLTF("./blender/figures/rook.glb");
  const setActiveFigure = useGame((state) => state.setActiveFigure);
  const playerColor = useGame((state) => state.playerColor);
  const playerFigure = figureName.includes(playerColor);

  const onMove = useGame((state) => state.onMove);

  const availableClick = playerFigure === true && onMove === true;

  // For inital animation
  const numFigure = figureName.charAt(figureName.length - 1);
  const delay = numFigure == 0 ? 0 : 0.28;

  const rookGroupRef = useRef();

  const applyMove = useGame((state) => state.applyMove);

  const applyCapture = useGame((state) => state.applyCapture);
  const applyUndoCaptured = useGame((state) => state.applyUndoCaptured);

  const applyCastling = useGame((state) => state.applyCastling);

  // apply castling
  useEffect(() => {
    if (applyCastling)
      if (applyCastling.figure === figureName) {
        let rotationX = Math.PI * 2;
        if (applyCastling.undo) {
          rotationX = 0;
        }
        let tl = gsap.timeline();
        tl.to(rookGroupRef.current.position, {
          y: 0.79,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(rookGroupRef.current.rotation, {
          x: rotationX,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(rookGroupRef.current.position, {
          ease: "circ.out",
          duration: 0.45,
          x: applyCastling.position[0],
          z: applyCastling.position[1],
        });
        tl.to(rookGroupRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
  }, [applyCastling]);

  // apply undo on capture
  useEffect(() => {
    if (applyUndoCaptured) {
      if (applyUndoCaptured.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(rookGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(rookGroupRef.current.rotation, {
          x: 0,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(rookGroupRef.current.position, {
          x: applyUndoCaptured.position[0],
          z: applyUndoCaptured.position[1],
          ease: "circ.out",
        });
        tl.to(rookGroupRef.current.position, {
          y: 0.5,
          duration: 0.15,
        });
      }
    }
  }, [applyUndoCaptured]);

  // apply move
  useEffect(() => {
    if (applyMove) {
      if (applyMove.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(rookGroupRef.current.position, {
          x: applyMove.position[0],
          z: applyMove.position[1],
          y: 0.5,
          ease: "circ.out",
        });
      }
    }
  }, [applyMove, applyCapture]);

  // apply capture for opponent figures
  useEffect(() => {
    if (applyCapture) {
      const length = applyCapture.length - 1;
      if (applyCapture[length] === figureName) {
        let finalX = -1.34;
        let xMultiplier = -0.2;
        let color = "black";
        if (applyCapture[length].includes("white")) {
          color = "white";
          finalX = 1.34;
          xMultiplier = 0.2;
        }
        const lengthColor = applyCapture.filter((figure) =>
          figure.includes(color)
        ).length;
        var tl = gsap.timeline();
        let row = 0;
        if (lengthColor > 7) {
          row = 1;
        }

        tl.to(rookGroupRef.current.position, {
          y: 0.9,
          ease: "circ.out",
          duration: 0.1,
        });
        tl.to(rookGroupRef.current.rotation, {
          x: Math.PI * 2,
          ease: "power2",
          duration: 0.44,
        });
        tl.to(rookGroupRef.current.position, {
          x: finalX + xMultiplier * row,
          z: 0.64 - 0.19 * lengthColor + (7 * 0.19 + 0.095) * row,
          ease: "circ.out",
          duration: 0.45,
        });
        tl.to(rookGroupRef.current.position, {
          y: 0.38,
          duration: 0.15,
        });
      }
    }
  }, [applyCapture]);

  return (
    <>
      <group ref={rookGroupRef} position={[positionX, 0.5, positionZ]}>
        <motion.mesh
          initial={{
            y: 3,
          }}
          animate={{
            y: 0,
          }}
          transition={{
            delay: 1.2 + delay,
            duration: 0.7,
          }}
          onClick={
            availableClick
              ? (event) => {
                  event.stopPropagation();
                  setActiveFigure(figureName);
                }
              : null
          }
          castShadow
          geometry={nodes.rook.geometry}
          material={material}
          scale={0.039}
        />
      </group>
    </>
  );
};

export const King = ({ props }) => {
  const { material, positionX, positionZ, figureName } = props;
  const { nodes } = useGLTF("./blender/figures/king.glb");
  const setActiveFigure = useGame((state) => state.setActiveFigure);
  const playerColor = useGame((state) => state.playerColor);
  const playerFigure = figureName.includes(playerColor);

  const onMove = useGame((state) => state.onMove);

  const availableClick = playerFigure === true && onMove === true;

  const kingRef = useRef();

  const applyMove = useGame((state) => state.applyMove);

  // apply move
  useEffect(() => {
    if (applyMove) {
      if (applyMove.figure === figureName) {
        let tl = gsap.timeline();
        tl.to(kingRef.current.position, {
          x: applyMove.position[0],
          z: applyMove.position[1],
          y: 0.5,
          ease: "circ.out",
        });
      }
    }
  }, [applyMove, onMove]);

  return (
    <>
      <motion.mesh
        ref={kingRef}
        initial={{
          y: 4,
        }}
        animate={{
          y: 0.5,
        }}
        transition={{
          delay: 1.2 + 0.12,
          duration: 0.7,
        }}
        onClick={
          availableClick
            ? (event) => {
                event.stopPropagation();
                setActiveFigure(figureName);
              }
            : null
        }
        castShadow
        geometry={nodes.KingB.geometry}
        material={material}
        scale={0.034}
        position={[positionX, 0.5, positionZ]}
      />
    </>
  );
};
