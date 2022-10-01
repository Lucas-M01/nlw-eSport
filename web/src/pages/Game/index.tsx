import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { DuoCard, DuoCardProps } from "./components/DuoCard";
import { Header } from "./components/Header";

import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassPlus } from "phosphor-react";
import { CreatedAtModal } from "../../components/CreatedAdModal";
import axios from "axios";

export interface Game {
    id: any;
    title: string;
    bannerUrl: string;
    about: string;
    tags: string[];
}


export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([])

    const [game, setGame] = useState<Game | any>([{}])
    const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        rubberband: false,
        breakpoints: {
          "(min-width: 200px)": {
            slides: { perView: 1.5, spacing: 5 },
          },
          "(min-width: 400px)": {
            slides: { perView: 2, spacing: 5 },
          },
          "(min-width: 600px)": {
              slides: { perView: 2.5, spacing: 5 },
          },
          "(min-width: 800px)": {
              slides: { perView: 3.5, spacing: 5 },
          },
          "(min-width: 1000px)": {
              slides: { perView: 4, spacing: 10 },
          },
          "(min-width: 1200px)": {
              slides: { perView: 4.8, spacing: 10 },
          },
        },
        mode: "free-snap",
        slides: { origin: "center", perView: 4.8, spacing: 15 },
      })

      function getIdLocalStorage() {
        const id = localStorage.getItem("id")
        return id
      }

      useEffect(() => {
          axios(`http://localhost:3333/games/${getIdLocalStorage()}/ads`)
          .then((data) => {
              setDuos(data.data)
            })
        }, [])

        useEffect(() => {
            axios(`http://localhost:3333/game/${getIdLocalStorage()}`)
                .then((data) => {
                    setGame(data.data)
                })
        }, [])
        
        
        const { title, bannerUrl, tags, about }: Game = game[0]

    return(
        <div className="ml-28  mr-28">
            <Header title={title} />

            <main className="flex mt-16 animate-appear">
                <img src={bannerUrl} className="rounded-lg shadow-2xl shadow-black/25 h-56" />

                <div className="ml-9 mr-15 h-60 ">
                    <h2 className="font-bold text-4xl select-all text-white">Sobre</h2>
                    <div className="mt-2 select-none text-zinc-300 ">
                        {tags && tags.map((tag: string) => <span key={tag} className="mr-3 hover:shadow-2xl bg-zinc-700 hover:bg-zinc-600 py-0 hover:duration-300 rounded-xl font-bold px-4">{tag}</span>)}
                    </div>

                    <div className="text-zinc-200 max-w-[90%] mt-4 ">
                        <p className="" >{about}</p>
                    </div>
                </div>
            </main>
            <section className="mt-6 animate-appear">
                {duos.length > 0 ? (
                    <div ref={slideRef} className="keen-slider max-h-80 max-w-[1220px]">
                        {duos.map(item => {
                            return(
                                <div key={item.id} className="keen-slider__slide shadow-2xl shadow-black/25">
                                    <DuoCard data={item}  />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-72  rounded">
                        <div className="bg-[#2A2634] shadow-black/25 shadow-lg rounded flex flex-col items-center p-5">
                            <h3 className="text-zinc-200 block text-lg">Nenhum anúncio encontrado</h3>
                            <p className="font-semibold text-zinc-200">Nenhum jogador interessado nesse jogo no momento.</p>
                            <Dialog.Root>
                                <Dialog.Trigger className="py-2 px-3 mt-2 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
                                    <MagnifyingGlassPlus size={24} />
                                     Publicar anúncio
                                </Dialog.Trigger>
                                <CreatedAtModal  />
                            </Dialog.Root>
                        </div>
                    </div>
                )}
            </section>

        </div>
    )
}