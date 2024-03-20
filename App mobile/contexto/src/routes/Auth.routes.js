import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Produtos from '../pages/produtos'

export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/Produtos' element={<Produtos />} />
            </Routes>
        </BrowserRouter>
    )
}

