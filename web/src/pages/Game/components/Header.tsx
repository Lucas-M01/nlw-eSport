import { Link } from 'react-router-dom'
import logo from '../../../assets/logo.svg'

export function Header() {
    return(
        <div className="h-16 flex items-center">
            <header className="text-white mt-4 flex items-center max-w-[1344px]">
                <Link to="/">
                    <img src={logo} className="mr-2" />
                </Link>
                <span className="h-11 animate-appear mr-2 border-r-[4px] rounded-md left-[230px] border-zinc-200"></span>
                <h1 className="text-2xl whitespace-nowrap animate-slide animate-reveal overflow-hidden font-black text-transparent bg-nlw-gradient select-none bg-clip-text">Sobre</h1>
            </header>
        </div>
    )
}