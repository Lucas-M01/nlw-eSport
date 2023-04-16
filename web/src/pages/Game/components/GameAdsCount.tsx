import React, { useEffect, useState } from "react";
import { countAdsByGame } from "../index";

interface GameAdsCountProps {
  gameId: number;
}

export const GameAdsCount: React.FC<GameAdsCountProps> = ({ gameId }) => {
  const [adsCount, setAdsCount] = useState(0);

  useEffect(() => {
    setAdsCount(countAdsByGame(gameId));
  }, [gameId]);

  return <div>Número de anúncios: {adsCount}</div>;
};
