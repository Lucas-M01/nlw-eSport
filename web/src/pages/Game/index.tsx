import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { DuoCard, DuoCardProps } from "./components/DuoCard";
import { Header } from "./components/Header";

import * as Dialog from '@radix-ui/react-dialog'
import { MagnifyingGlassPlus } from "phosphor-react";
import { CreatedAtModal } from "../../components/CreatedAdModal";
import axios from "axios";

export interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    about: string;
    tags: string[];
}


export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([])
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

      useEffect(() => {
          axios(`http://localhost:3333/games/2b69ff64-52e1-450a-a166-8f118faa9a16/ads`)
          .then((data) => {
              setDuos(data.data)
            })
        }, [])
        

    return(
        <div className="ml-28  mr-28">
            <Header />

            
            
            <section className="mt-6 animate-appear">
                {duos.length > 0 ? (
                    <div ref={slideRef} className="keen-slider max-h-80 max-w-[1220px]">
                        {duos.map(item => {
                            return(
                                <div key={item.id} className="keen-slider__slide ">
                                    <DuoCard data={item} />
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-72  rounded">
                        <div className="bg-[#2A2634] rounded flex flex-col items-center p-5">
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