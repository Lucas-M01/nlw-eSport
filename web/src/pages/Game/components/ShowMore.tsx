import * as Dialog  from "@radix-ui/react-dialog";

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
                <h2 className="text-2xl mr-2 whitespace-nowrap overflow-hidden font-black text-transparent bg-nlw-gradient select-all bg-clip-text">{title}</h2>
                    
                <div className="select-none text-zinc-300 border-b-2 border-zinc-600 pb-2">
                    {tags && tags.map((tag: string) => <span key={tag} className="mr-1 mt-2 hover:shadow-2xl bg-zinc-700 hover:bg-zinc-600 py-0 hover:duration-300 rounded-xl font-bold px-3">{tag}</span>)}
                </div>
                
                <h3>Sobre</h3>
                <p className="mt-1">{about}</p>
                <a href={link} target="_blank">Acesse o site</a>
            </Dialog.Content>
        </Dialog.Portal>
    )
}