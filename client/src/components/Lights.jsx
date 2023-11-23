import { motion } from "framer-motion-3d";
export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.04} />
      <motion.directionalLight
        initial={{ x: -4, y: 14, z: -1, intensity: 0.01 }}
        animate={{ x: 4, y: 9, z: -1, intensity: 0.34 }}
        transition={{ duration: 0.8, delay: 1.44 }}
        castShadow
      />
      <directionalLight intensity={0.11} position={[-9, 5, 1]} castShadow />
    </>
  );
}
