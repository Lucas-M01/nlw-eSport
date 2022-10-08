interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
    handleClick: () => void;
}

export function GameBanner({ bannerUrl, title, adsCount, handleClick }:GameBannerProps) {
    return(
        <div className="relative rounded-lg overflow-hidden" onClick={handleClick} title={title}>
          <img src={bannerUrl} />
          
          <div className="w-full px-2 py-2 pt-16 md:pb-4 md:px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
            <strong className="font-bold text-white h-6 overflow-hidden truncate block md:h-6">{title}</strong>
            <span className="text-zinc-300 text-base truncate overflow-hidden mt-1 md:text-sm block">{adsCount} anúncio(s)</span>
          </div>
        </div>
    )
}