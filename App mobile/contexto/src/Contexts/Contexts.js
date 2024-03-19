import { createContext, useState } from 'react'

export const Contexts = createContext()

export default function AuthProvider({ children }) {

   

    async function handleLogar(email, senha) {
        console.log(email, senha)
    }

    return (
        <Contexts.Provider value={{handleLogar}}>
            {children}
        </Contexts.Provider>
    )
}