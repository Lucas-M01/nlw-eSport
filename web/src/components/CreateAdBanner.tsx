import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner() {
    return(
      <div className="self-stretch rounded-t-lg pt-1 mt-8 bg-nlw-gradient overflow-hidden">
        <div className="bg-[#2A2634] sm:px-8 px-4 py-6  sm:flex md:justify-between ">
          <div>
            <strong className="font-black text-xl sm:text-2xl text-white ">Não encontrou seu duo?</strong>
            <span className="text-zinc-400 block">Publique um anúncio para encontrar novos players!</span>
          </div>
          <Dialog.Trigger className="py-3 px-4 mt-2 m-auto sm:m-0 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3">
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </Dialog.Trigger>
        </div>
      </div>
    )
}