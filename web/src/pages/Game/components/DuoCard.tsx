import { GameController } from "phosphor-react";
import { DuoInfo } from "./DuoInfo";

export interface DuoCardProps {
    id: string;
    discord: string;
    hourEnd: string;
    hourStart: string;
    name: string;
    useVoiceChannel: boolean;
    weekDays: string[];
    yearsPlaying:number;
}

interface Props {
    data: DuoCardProps;
    onConnect?: () => void;
}

export function DuoCard({data, onConnect}: Props) {
    return (
        <div className="bg-[#2A2634] p-5 h-full w-60 rounded">
            <DuoInfo 
                label="Nome"
                value={data.name}
            />            

            <DuoInfo 
                label="Tempo de jogo"
                value={`${data.yearsPlaying} ano(s)`}
            />
            
            <DuoInfo 
                label="Disponibilidade"
                value={`${data.weekDays.length} dia(s) \u2022 ${data.hourStart}h - ${data.hourEnd}h`}
            />
            
            <DuoInfo 
                label="Chamada de áudio?"
                value={data.useVoiceChannel ? "Sim" : "Não"}
                colorValue={data.useVoiceChannel ? 'text-[#34D399]' : 'text-[#F87171]'}
            />
    
            <button 
                className="w-full h-11 mt-4 bg-[#8B5CF6] rounded-lg flex items-center justify-center cursor-pointer"
                onClick={onConnect}
            >
                <GameController className="text-white mr-2" size={20} />
    
                <p className="text-white text-sm font-semibold">
                    Conectar
                </p>
            </button>
        </div>
    );
  }

  /* 
  target="_blank"
                href="https://discord.com/app" 
  
  */