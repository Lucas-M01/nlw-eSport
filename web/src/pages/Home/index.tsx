import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from 'react'
import { GameBanner } from '../../components/GameBanner'
import { CreateAdBanner } from '../../components/CreateAdBanner'
import { CreatedAtModal } from '../../components/CreatedAdModal'
import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import { Link } from 'react-router-dom'
import "keen-slider/keen-slider.min.css";
import '../../styles/main.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Games } from "../../mock/Games";
import logoImg from '../../assets/logo-nlw-esports.svg'
import { Game, countAdsByGame } from "../Game";

export interface GameInfo extends Game {
    _count: {
        ads: number;
    }
}

function saveIdGame(game: any) {
    localStorage.setItem("id", game)
}

export function Home() {
    const [games, setGames] = useState<GameInfo[]>([])
    const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        rubberband: false,
        breakpoints: {
            "(min-width: 200px)": {
                slides: { perView: 1.3, spacing: 10 },
            },
            "(min-width: 400px)": {
                slides: { perView: 2.5, spacing: 5 },
            },
            "(min-width: 600px)": {
                slides: { perView: 3.5, spacing: 5 },
            },
            "(min-width: 800px)": {
                slides: { perView: 4.5, spacing: 5 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 5.5, spacing: 10 },
            },
            "(min-width: 1200px)": {
                slides: { perView: 6.5, spacing: 10 },
            },
        },
        mode: "free-snap",
        slides: { origin: "center", perView: 5.5, spacing: 10 },
    })

    const contextClass = {
        success: "bg-[#2A2634] relative flex p-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
    }

    function updateGameAds() {
        const adsData = localStorage.getItem("testAds")
        const ads = JSON.parse(adsData!)

        games.forEach(game => {
            const adInfo = ads.find((ad: any) => ad.idGame === Number(game.id))
            if (adInfo) {
                game._count.ads += 1;
            }
        });

        return games.map(game => game._count.ads);
    }

    updateGameAds()

    useEffect(() => {
        try {
            axios("http://localhost:3333/games").then((response) => {
                setGames(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    if (games.length === 0) {
        setGames(Games)
    }

    const [adsCounts, setAdsCounts] = useState<Record<number, number>>({});

    useEffect(() => {
        const adsData = localStorage.getItem("testAds");
        const ads = JSON.parse(adsData!);
      
        const counts: Record<number, number> = {};
      
        games.forEach((game) => {
          const filteredAds = ads.filter((ad: any) => ad.idGame === Number(game.id));
          counts[game.id] = filteredAds.length;
        });
      
        setAdsCounts(counts);
      }, [games]);

    return (
        <div className="max-w-[1344px] mx-auto sm:px-8 md:px-10  flex flex-col items-center mt-11">
            <ToastContainer
                theme={"dark"}
                position="top-center"
                limit={12}
                closeOnClick
                autoClose={5000}
                toastClassName={(type) => contextClass.success}
            />
            <div className="w-full h-full mx-auto px-4 sm:px-8 md:px-10 flex items-center flex-col">

                <img src={logoImg} className="w-60 h-28" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-black mt-16 mb-16" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>

                <main className="w-full " >
                    {games.length > 0 && (
                        <div className="flex items-center ">
                            <div ref={slideRef} className="keen-slider">
                                {games.map(game => {
                                    return (
                                        <Link to={`/game/${game.title}`} key={game.id} className="keen-slider__slide rounded-lg shadow-2xl shadow-black/25 ">
                                            <GameBanner bannerUrl={game.bannerUrl} handleClick={() => saveIdGame(game.id)} title={game.title} adsCount={adsCounts[game.id] || 0} />
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </main>

                <Dialog.Root>
                    <CreateAdBanner />
                    <CreatedAtModal />
                </Dialog.Root>
            </div>
        </div>
    )
}
