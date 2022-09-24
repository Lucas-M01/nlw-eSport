import { NavLink, Link } from 'react-router-dom'

interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount }:GameBannerProps) {
    return(
        <Link to={`/game/${title}`} title={title} className="rounded-lg overflow-hidden">
          <img src={bannerUrl} />
          
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
          </div>
        </Link>
    )
}