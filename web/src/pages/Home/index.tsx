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

import logoImg from '../../assets/logo-nlw-esports.svg'
import { Game } from "../Game";

export interface GameInfo extends Game{
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
      initial: 0,
      rubberband: false,
      breakpoints: {
        "(min-width: 200px)": {
          slides: { perView: 2.2, spacing: 5 },
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

    useEffect(() => {
        axios("http://localhost:3333/games").then((response) => {
            setGames(response.data);
        });
    }, []);

    return (
        <div className="max-w-[1344px] mx-auto sm:px-8 md:px-10 flex flex-col items-center mt-10 ">
            <ToastContainer
                theme={"dark"}
                position="top-center"
                closeOnClick
                autoClose={5000}
                toastClassName={(type) => contextClass.success}
            />
            <img src={logoImg} className="w-60 h-28" />
            <h1 className="text-5xl text-white font-black mt-16 mb-16" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
            
            <div className="flex items-center">
                <div ref={slideRef} className="keen-slider max-h-56 max-w-[1150px] mx-6"> 
                {games.map(game => {
                    return (
                        <Link to={`/game/${game.title}`}  key={game.id} className="keen-slider__slide rounded-lg overflow-hidden">
                            <GameBanner bannerUrl={game.bannerUrl} handleClick={() => saveIdGame(game.id)} title={game.title} adsCount={game._count.ads} />
                        </Link>
                    )
                })}
                </div>
            </div>

            <div className="w-[1150px]">
                <Dialog.Root>
                    <CreateAdBanner />
                   
                    <CreatedAtModal />
                </Dialog.Root>
            </div>
        </div>
    )
}
