import * as Dialog  from "@radix-ui/react-dialog";
import { GameController, X } from "phosphor-react";

interface Props {
    title: string;
    about: string;
    tags: string[];
    link: string;
}

export function ShowMore({ title, tags, about, link }: Props) {
    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className="fixed bg-[#2A2634] py-6 w-96 md:py-8 px-4 md:px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg md:w-[480px] shadow-lg shadow-black/25">
                <div className="flex justify-between">
                    <h2 className="text-2xl mr-2 whitespace-nowrap overflow-hidden font-black text-transparent bg-nlw-gradient select-all bg-clip-text">{title}</h2>
                    <Dialog.Close type="button">
                        <X size={24} />
                    </Dialog.Close>
                </div>
                <div className="select-none text-zinc-300 border-b-2 border-zinc-600 pb-2 flex flex-wrap">
                    {tags && tags.map((tag: string) => <span key={tag} className="mr-1 mt-2 hover:shadow-2xl bg-zinc-700 hover:bg-zinc-600 py-0 hover:duration-300 rounded-xl font-bold px-3">{tag}</span>)}
                </div>
                
                <p className="mt-1">{about}</p>
                <a href={link} target="_blank" className="text-zinc-200 bg-violet-500 flex items-center gap-2 w-24 m-auto hover:bg-violet-600 py-1 px-2 rounded">
                
                    <GameController weight="fill" size={20} />
                    Jogar
                    
                </a>
            </Dialog.Content>
        </Dialog.Portal>
    )
}