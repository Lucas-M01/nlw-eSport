import { CaretLeft, CaretRight } from "phosphor-react"

interface ArrowProps {
    disabled?: boolean
    left?: boolean
    onClick?: (e: any) => void
}

export function Arrow({ disabled, left, onClick}: ArrowProps) {
    return (
      <button onClick={onClick} className={`text-zinc-400 ${disabled ? "cursor-default opacity-40" : " hover:text-zinc-300"} `}>
        {left ? <CaretLeft size={48} /> : <CaretRight size={48}/>}  
      </button>
    )
}