import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { DuoCard, DuoCardProps } from "./components/DuoCard";
import { Header } from "./components/Header";
import { Games } from "../../mock/Games";
import { ads } from "../../mock/Ads";
import * as Dialog from '@radix-ui/react-dialog'
import { DotsThreeCircle, GameController, MagnifyingGlassPlus } from "phosphor-react";
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

        function getIdGameLocalStorage(index: number) {
            const ads = localStorage.getItem("testAds")
            const idAds = JSON.parse(ads!)
            for(let i in idAds) {
                if(index === idAds[i].idGame){
                    const testddd = idAds.find((item: any) => {
                        return item.idGame === index
                    })
                    let arrayMock = []
                    arrayMock.push(testddd)
                    return setDuos(arrayMock)
                }
            }
          }
        
        if(game.length === 1){
            const index = Games.findIndex((game: Game) => game.id === getIdLocalStorage())
            setGame(Games[index])
            getIdGameLocalStorage(index)
        }
        
    return(
        <div className="ml-6 sm:ml-28 md:mr-28 max-w-[1344px]">
            <Header title={game.title} />
            <ToastContainer
                theme={"dark"}
                position="top-center"
                closeOnClick
                autoClose={5000}
                toastClassName={(type) => contextClass.success}
            />

            <main className="flex mt-9 h-64 md:mt-16 animate-appear w-full">
                
                <img src={game.bannerUrl} className="rounded-lg shadow-2xl shadow-black/25 h-64 md:h-56 " />
            
                <div className="ml-9 mr-15 mt-24 lg:mt-0 h-60 ">
                    <div className="items-center hidden lg:flex">
                        <h2 className="font-bold text-4xl  text-white mr-3">Sobre</h2>
                        <a target="_blank" href={game.link}>
                            <div className="bg-zinc-600 rounded-full flex justify-center w-8 h-8 p-1 items-center hover:bg-zinc-500" title={game.link}>
                                <GameController weight="fill" size={22} className="text-zinc-200" />
                                
                            </div>
                        </a>
                    </div>

                    <div className="mt-2 hidden lg:block select-none text-zinc-300 ">
                        {game.tags && game.tags.map((tag: string) => <span key={tag} className="mr-3 hover:shadow-2xl bg-zinc-700 hover:bg-zinc-600 py-0 hover:duration-300 rounded-xl font-bold px-4">{tag}</span>)}
                    </div>

                    <div className="text-zinc-200 hidden lg:block text-sm md:text-base md:h-full mt-4 ">
                        {game.about && game.about.length > 200 ? (
                            <p className="">{showMore ? game.about : `${game.about.substring(0, 291).concat("...")}`}
                                <button className="text-violet-500 hover:text-violet-400" onClick={() => setShowMore(!showMore)} >
                                    {showMore ? 
                                        "Mostrar menos"
                                       : 
                                        "Mostrar mais"
                                    }
                                </button> 
                            </p>) : 
                            <p>{game.about}</p> }
                    </div>
                    <div className="block  lg:hidden bg-violet-500 hover:bg-violet-600 rounded  p-2">
                                    <Dialog.Root>
                                        <Dialog.Trigger className='text-zinc-200 flex items-center gap-1'>
                                            <DotsThreeCircle /> 
                                            Sobre o jogo
                                        </Dialog.Trigger>
                                        <ShowMore about={game.about} title={game.title} tags={game.tags} link={game.link} />
                                    </Dialog.Root>
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
                            <Dialog.Trigger title="Criar novo anúncio" className="sm:ml-9 mt-5 py-2 px-3 rounded after:content-['Publicar'] m-auto sm:m-0 sm:after:content-none after:ml-2 flex text-zinc-200 bg-violet-500 hover:bg-violet-600 sm:rounded-full sm:p-1">
                                <MagnifyingGlassPlus size={24} />
                            </Dialog.Trigger>
                            <CreatedAtModal />
                        </Dialog.Root>
                    </div>
                ) : (
                    <div className="flex justify-center w-80 sm:w-full items-center h-72  rounded">
                        <div className="bg-[#2A2634] shadow-black/25 shadow-lg rounded flex flex-col items-center  p-5">
                            <h3 className="text-zinc-200 block text-lg">Nenhum anúncio encontrado</h3>
                            <p className="font-semibold text-base text-zinc-200">Nenhum jogador interessado nesse jogo no momento.</p>
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