import { FormEvent, useEffect, useState } from "react";
import axios from 'axios';

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox"
import * as Select from "@radix-ui/react-select"
import * as ToggleGroup from "@radix-ui/react-toggle-group"

import { CaretDown, Check, GameController } from "phosphor-react";
import { Input } from "./Form/input";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface Game {
    id: string;
    title: string;
}

const schema = z.object({
  name: z.string().min(1, { message: 'Required' }),
  yearsPlaying: z.number().min(1).max(30),
  discord: z.string().min(6).max(60),
  weekDays: z.array(z.number()),
  hourStart: z.string(),
  hourEnd: z.string(),
  useVoiceChannel: z.boolean(),
})

export function CreatedAtModal() {
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)
    const { register } = useForm({
      resolver: zodResolver(schema)
    })

    useEffect(() => {
        axios('http://localhost:3333/games').then(response => {
            setGames(response.data)
        })
    }, [])

    async function handleCreatedAd(event: FormEvent){
        event.preventDefault()

        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        // Validação com React Hook Form
        if(!data.name) {
            return
        }
        

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel,
            })

            alert('Anúncio criado com sucesso!')
        } catch (err) {
            console.log(err);
            alert('Erro ao criar anúncio!')
        }
    }
    return(
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

              <form onSubmit={handleCreatedAd} className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='font-semibold' htmlFor="game">Qual o game?</label>
                    <Select.Root name="game">
                        <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 flex justify-between items-center">
                            <Select.Value  placeholder="Selecione o game que deseja jogar" />
                            <Select.Icon>
                                <CaretDown size={24} />
                            </Select.Icon>
                        </Select.Trigger>
                        <Select.Content className="bg-zinc-700 overflow-hidden rounded-lg">
                          <Select.ScrollUpButton className="flex align-center justify-center h-6 bg-zinc-700 text-zinc-500 cursor-default" />
                                <Select.Group >
                                  {games.map(game => {
                                    return (
                                      <Select.Item className="select-none py-4 px-8 w-[25rem] flex items-center hover:bg-violet-500 " key={game.id} value={game.id}>
                                          <Select.ItemText>{game.title}</Select.ItemText>
                                          <Select.ItemIndicator className="absolute w-6 inline-flex justify-center pl-2 left-0 items-center">
                                              <Check size={26} />
                                          </Select.ItemIndicator>
                                      </Select.Item>
                                      )
                                    })}
                                </Select.Group>
                          <Select.ScrollDownButton className="flex align-center justify-center h-6 bg-zinc-700 text-zinc-500 cursor-default" />
                        </Select.Content>
                    </Select.Root>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input name="yearsPlaying" id="yearsPlaying" placeholder="Tudo bem ser ZERO"type="number" />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input name="discord" id="discord" type="text" placeholder='Usuario#0000' />
                  </div>
                </div>

                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                        
                        <ToggleGroup.Root className="grid grid-cols-4 gap-2" value={weekDays} type="multiple" onValueChange={setWeekDays}>
                            <ToggleGroup.Item  value="0"                          className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Domingo">D</ToggleGroup.Item>
                            
                            <ToggleGroup.Item  value="1"                          className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Segunda">S</ToggleGroup.Item>
                            
                            <ToggleGroup.Item  value="2"                          className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Terça">T</ToggleGroup.Item>
                            
                            <ToggleGroup.Item  value="3"                          className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quarta">Q</ToggleGroup.Item>
                            
                            <ToggleGroup.Item  value="4"                          className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quinta">Q</ToggleGroup.Item>
                            
                            <ToggleGroup.Item  value="5"                          className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sexta">S</ToggleGroup.Item>
                            
                            <ToggleGroup.Item  value="6"                          className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sábado">S</ToggleGroup.Item>
                        </ToggleGroup.Root>

                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor="hourStart">Qual horária do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                      <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <label className="mt-2 flex gap-2 text-sm items-center">
                  <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                    if (checked === true) {
                        setUseVoiceChannel(true)
                    }else {
                        setUseVoiceChannel(false)
                    }
                  }} className="w-6 h-6 p-1 rounded bg-zinc-900">
                    <Checkbox.Indicator>
                        <Check className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar no chat de voz
                </label>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600" type="submit">
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
          </Dialog.Content>
        </Dialog.Portal>
    )
}