import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

export default function FieldsHelper() {
  const { scene } = useThree();

  useEffect(() => {
    const gridHelper = new THREE.GridHelper(1.858, 8, "#ffffff", "#ffffff");
    const axesHelper = new THREE.AxesHelper(0.1858);
    axesHelper.position.set(0, 0.5, 0);

    gridHelper.position.set(0, 0.49999, 0);
    // console.log(gridHelper);
    scene.add(gridHelper);
    // scene.add(axesHelper);

    return () => {
      scene.remove(gridHelper);
      // scene.remove(axesHelper);
    };
  }, []);

  return null;
}
