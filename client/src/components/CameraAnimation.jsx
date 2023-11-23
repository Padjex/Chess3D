import { useFrame, useThree } from "@react-three/fiber";
import useGame from "../store/useGame";
import gsap from "gsap";
import { useEffect } from "react";

export const CameraAnimation = () => {
  const { camera } = useThree();
  // useEffect(() => {
  //   camera.lookAt(0, 0.1, 0);
  // }, []);

  const started = useGame((state) => state.started);
  const playerColor = useGame((state) => state.playerColor);

  // Camera animation on started
  useEffect(() => {
    if (started) {
      let ctx = gsap.context(() => {
        gsap.to(camera.position, {
          duration: 1.4,
          delay: 0.9,
          x: 0,
          y: 2.69,
          z: -1.6,
          ease: "power2.out",
          onUpdate: () => {
            camera.lookAt(0, 0.1, 0);
          },
        });
      });
      return () => {
        ctx.revert();
      };
    }
  }, [started]);

  // Camera animation on playerColor set
  useEffect(() => {
    if (playerColor === "black") {
      let ctx = gsap.to(camera.position, {
        delay: 0.8,
        duration: 1.4,
        x: 0,
        z: 1.6,
        ease: "power1.inOut",
        onUpdate: function () {
          camera.lookAt(0, 0.1, 0);
          const z = (camera.position.z + 1.6) * 0.981747704246875;
          // console.log(z);

          camera.position.x = Math.sin(z) * 2.6;
          camera.position.y = -Math.sin(z) * 1.2 + 2.69;

          // console.log("X" + camera.position.x);
          // console.log("Y" + camera.position.y);
        },
      });
      return () => {
        ctx.revert();
      };
    }
  }, [playerColor]);

  return null;
};
