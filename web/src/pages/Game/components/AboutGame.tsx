import { useEffect, useState } from "react";
import axios from "axios";
import { Game } from "..";

interface Props {
    id: string;
    img: string;
    title: string;
    tags: string[];
    about: string;
}

export function AboutGame({ img, title, tags, about, id }: Props) {
    const [game, setGame] = useState<Game | any>([])

    useEffect(() => {
        axios(`http://localhost:3333/game/${id}`)
        .then((data) => {
            setGame(data.data)
          })
    }, [])
    
    return(
        <main className="flex mt-16 animate-appear">
            <img src={img} className="rounded-lg shadow-2xl h-56" />
                
                <div className="ml-9 mr-15 h-60 ">
                    <h2 className="font-bold text-4xl select-all text-white">{title}</h2>
                    <div className="mt-2 select-none text-zinc-300 ">
                        {tags.map(tag => {
                            return(
                                <span className="mr-3 hover:shadow-2xl bg-zinc-700 hover:bg-zinc-600 py-0 hover:duration-300 rounded-xl font-bold px-4">{tag}</span>
                            )
                        })}
                    </div>
                    
                    <div className="text-zinc-200 w-[90%] mt-4 ">
                        <p className="">{about}</p>
                    </div>
                </div>
        </main>
    )
}