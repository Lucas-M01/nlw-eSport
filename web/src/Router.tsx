import { Route, Routes } from 'react-router-dom'

import { Game } from './pages/Game'
import { Home } from './pages/Home'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:title" element={<Game />} />
        </Routes>
    )
}