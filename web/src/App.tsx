import { useKeenSlider } from "keen-slider/react";

import { useEffect, useState } from 'react'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { CreatedAtModal } from './components/CreatedAdModal'

import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'

import "keen-slider/keen-slider.min.css";
import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'
import { Arrow } from "./components/Arrows";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

export function App() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [games, setGames] = useState<Game[]>([])
  const [loaded, setLoaded] = useState(false)
  const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    rubberband: false,
    slides: {
      perView: 6,
      spacing: 24,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {
    axios('http://localhost:3333/games').then(res => {
        setGames(res.data)
      })
  }, [])

  return (
    <div className="max-w-full mx-auto flex flex-col items-center my-20">
      <img src={logoImg} className="w-72 h-40" />
      <h1 className="text-6xl text-white font-black mt-20 mb-16" >Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.</h1>
      
      <div className="flex items-center">
      {loaded && instanceRef.current && (
        <Arrow 
          left  
          disabled={currentSlide === 0} 
          onClick={(e: any) => {
            e.stopPropagation() || instanceRef.current?.prev()
          }} 
        />
      )}
        
        <div ref={slideRef} className="keen-slider max-w-[1344px] mx-6"> 
          {games.map(game => {
            return (
                <div key={game.id} className="keen-slider__slide rounded-lg overflow-hidden">
                  <GameBanner bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
                </div>
              )
            })}
        </div>
        {loaded && instanceRef.current && (
          <Arrow 
            onClick={(e: any) => {
              e.stopPropagation() || instanceRef.current?.next()
            }}
          />
        )}
      </div>
      
      <div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreatedAtModal />
        </Dialog.Root>
      </div>
    </div>
  )
}