import { useKeenSlider } from "keen-slider/react";

import { useEffect, useState } from 'react'

import { GameBanner } from '../../components/GameBanner'
import { CreateAdBanner } from '../../components/CreateAdBanner'
import { CreatedAtModal } from '../../components/CreatedAdModal'

import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

import "keen-slider/keen-slider.min.css";
import '../../styles/main.css'

import logoImg from '../../assets/logo-nlw-esports.svg'

interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

export function Home() {
    const [games, setGames] = useState<Game[]>([])
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
      mode: "free",
      slides: { origin: "center", perView: 5.5, spacing: 10 },
    })
  
    useEffect(() => {
      axios('http://localhost:3333/games').then(res => {
          setGames(res.data)
        })
    }, [])

    return (
        <div className="max-w-[1344px] mx-auto sm:px-8 md:px-10 flex flex-col items-center my-20 mb-20">
            <img src={logoImg} className="w-72 h-40" />
            <h1 className="text-6xl text-white font-black mt-20 mb-16" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
            
            <div className="flex items-center">
                <div ref={slideRef} className="keen-slider max-w-[1220px] mx-6"> 
                {games.map(game => {
                    return (
                        <div key={game.id} className="keen-slider__slide rounded-lg overflow-hidden">
                            <GameBanner bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
                        </div>
                    )
                    })}
                </div>
            </div>
            
            <div className="w-[1220px]">
                <Dialog.Root>
                    <CreateAdBanner />
                    <CreatedAtModal />
                </Dialog.Root>
            </div>
        </div>
    )
}