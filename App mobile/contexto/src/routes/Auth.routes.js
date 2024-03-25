import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Produtos from '../pages/produtos'

export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/Produtos' element={<Produtos />} />
                <Route path='*' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

// * no path se cair em um rota que nao existe, manda para dashboard

