import useGame from "../../store/useGame";

export default function Console() {
  const checkKingOpponent = useGame((state) => state.checkKingOpponent);
  const checkKingPlayer = useGame((state) => state.checkKingPlayer);

  return null;
}
