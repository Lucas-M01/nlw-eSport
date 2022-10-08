import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { DuoCard, DuoCardProps } from "./components/DuoCard";
import { Header } from "./components/Header";

import * as Dialog from '@radix-ui/react-dialog'
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { CreatedAtModal } from "../../components/CreatedAdModal";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { ShowMore } from "./components/ShowMore";

export interface Game {
    id: any;
    title: string;
    bannerUrl: string;
    about: string;
    tags: string[];
    link: string;
}


export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([])
    const [showMore, setShowMore] = useState(false)
    const [game, setGame] = useState<Game | any>([{}])
    const [slideRef, instanceRef] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        rubberband: false,
        breakpoints: {
          "(min-width: 200px)": {
            slides: { perView: 1.2, spacing: 5 },
          },
          "(min-width: 400px)": {
            slides: { perView: 1.5, spacing: 5 },
          },
          "(min-width: 600px)": {
              slides: { perView: 2.2, spacing: 5 },
          },
          "(min-width: 800px)": {
              slides: { perView: 2.5, spacing: 5 },
          },
          "(min-width: 1000px)": {
              slides: { perView: 3.1, spacing: 10 },
          },
          "(min-width: 1200px)": {
              slides: { perView: 5.2, spacing: 10 },
          },
        },
        mode: "free-snap",
        slides: { origin: "center", perView: 4.8, spacing: 15 },
      })

      const contextClass = {
        success: "bg-[#2A2634] relative flex p-3 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
    }

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
        
        const { title, bannerUrl, tags, about, link, id }: Game = game[0]

    return(
        <div className="ml-6 sm:ml-28 md:mr-28 max-w-[1344px]">
            <Header title={title} />
            <ToastContainer
                theme={"dark"}
                position="top-center"
                closeOnClick
                autoClose={5000}
                toastClassName={(type) => contextClass.success}
            />

            <main className="flex mt-9 md:mt-16 animate-appear w-full">
                
                <img src={bannerUrl} className="rounded-lg shadow-2xl shadow-black/25 h-64 md:h-56 " />
            
                <div className="ml-9 mr-15 hidden sm:block h-60 ">
                    <div className="flex items-center">
                        <h2 className="font-bold text-4xl  text-white mr-3">Sobre</h2>
                        <a target="_blank" href={link}>
                            <div className="bg-zinc-600 rounded-full flex justify-center w-8 h-8 p-1 items-center hover:bg-zinc-500" title={link}>
                                <GameController weight="fill" size={22} className="text-zinc-200" />
                                
                            </div>
                        </a>
                    </div>

                    <div className="mt-2 select-none text-zinc-300 ">
                        {tags && tags.map((tag: string) => <span key={tag} className="mr-3 hover:shadow-2xl bg-zinc-700 hover:bg-zinc-600 py-0 hover:duration-300 rounded-xl font-bold px-4">{tag}</span>)}
                    </div>

                    <div className="text-zinc-200 text-sm md:text-base md:h-full mt-4 ">
                        {about && about.length > 200 ? (
                            <p className="">{showMore ? about : `${about.substring(0, 291).concat("...")}`}
                                <button className="text-violet-500 hover:text-violet-400 hidden lg:block w-[7.5rem]" onClick={() => setShowMore(!showMore)} >
                                    {showMore ? 
                                        "Mostrar menos"
                                       : 
                                        "Mostrar mais"
                                    }
                                </button> 
                                <Dialog.Root>
                                    <Dialog.Trigger>
                                        MostrarMais
                                    </Dialog.Trigger>
                                    <ShowMore about={about} title={title} tags={tags} link={link} />
                                </Dialog.Root>
                            </p>) : 
                            <p>{about}</p> }
                    </div>
                    
                    
                </div>
            </main>
            <section className="mt-11 sm:mt-6 animate-appear">
                {duos.length > 0 ? (
                    <div className="sm:flex md:items-center">
                        <div ref={slideRef} className="keen-slider md:max-h-80">
                            {duos.map(item => {
                                return(
                                    <div key={item.id} className="keen-slider__slide shadow-2xl shadow-black/25">
                                        <DuoCard data={item}  />
                                    </div>
                                )
                            })}
                        </div>
                        <Dialog.Root>
                            <Dialog.Trigger title="Criar novo anúncio" className="md:ml-9 mt-5 py-2 px-3 rounded after:content-['Publicar'] m-auto sm:m-0 sm:after:content-none after:ml-2 flex text-zinc-200 bg-violet-500 hover:bg-violet-600 md:rounded-full sm:p-1">
                                <MagnifyingGlassPlus size={24} />
                            </Dialog.Trigger>
                            <CreatedAtModal />
                        </Dialog.Root>
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
                                <CreatedAtModal />
                            </Dialog.Root>
                        </div>
                    </div>
                )}
            </section>

        </div>
    )
}