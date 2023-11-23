import { Sphere, useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function Background() {
  const material = useRef();
  const color = "#44403c";

  return (
    <group>
      <Sphere scale={10}>
        <meshStandardMaterial
          side={THREE.BackSide}
          toneMapped={false}
          color={color}
        />
      </Sphere>
    </group>
  );
}
