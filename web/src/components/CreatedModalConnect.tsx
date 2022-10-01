import * as Dialog from "@radix-ui/react-dialog";
import { DiscordLogo } from "phosphor-react";
import logoImg from '../assets/logo-nlw-esports.svg'

export function CreatedModalConnect() {
    return(
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
            <Dialog.Content className='fixed bg-[#2A2634] flex flex-col items-center py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg  shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl font-black flex flex-col mb-10 items-center'>
                    <img src={logoImg} className="mb-10 w-60 h-28" />
                    Conecte com o Discord 
                </Dialog.Title>
            
                    <a href="https://discord.com/api/oauth2/authorize?client_id=1024336310468620348&redirect_uri=http%3A%2F%2Flocalhost%3A3333%2Fauth%2Fredirect&response_type=code&scope=identify" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                        <DiscordLogo size={24} weight="fill" />
                        Conectar
                    </a>

            </Dialog.Content>
        </Dialog.Portal>
    )
    //para publicar um anúncio
}