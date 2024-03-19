import AuthRoutes from "./Auth.routes"
import NoAuthRoutes from "./noAuth.routes"
import { useContext } from 'react'
import { Contexts } from '../Contexts/Contexts'


export default function RotasIndex() {

  const { autenticado} = useContext(Contexts)
  // console.log(autenticado, nome)

  return (
    autenticado === true ? <AuthRoutes /> : <NoAuthRoutes />
  )
}