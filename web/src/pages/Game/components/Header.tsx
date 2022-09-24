import logo from '../../../assets/logo.svg'

export function Header() {
    return(
        <div className="h-16 flex items-center">
            <header className="text-white mt-4 flex items-center max-w-[1344px]">
                <img src={logo}/>
                <span className="h-11 mr-3 ml-4 border-r-[4px] rounded-md border-white"></span>
                <h1 className="text-2xl font-black">Fortnite</h1>
            </header>
        </div>
    )
}