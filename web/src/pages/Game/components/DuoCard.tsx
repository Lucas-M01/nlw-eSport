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
    discord?: string;
}

export function DuoCard({data}: Props) {
    return (
        <div className="bg-[#2A2634] p-5 h-full w-72 sm:w-60 rounded">
            <DuoInfo 
                label="Nome"
                value={data.name}
            />      

            <DuoInfo 
                label="Discord"
                value={data.discord}
                
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
    
            
        </div>
    );
  }

  /* 
  target="_blank"
                href="https://discord.com/app" 
  
  */