interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
    handleClick: () => void;
}

export function GameBanner({ bannerUrl, title, adsCount, handleClick }:GameBannerProps) {
    return(
        <div className="rounded-lg overflow-hidden" onClick={handleClick} title={title}>
          <img src={bannerUrl} />
          
          <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 text-sm block">{adsCount} anúncio(s)</span>
          </div>
        </div>
    )
}