
import { Router } from 'express'
import { AuthDentistController } from './controller/dentist/authDentistController'
import { CreateDentistController } from './controller/dentist/createDentistController'
import { EditDentistController } from './controller/dentist/editDentistController'
import { AuthUserController } from './controller/user/authUserController'
import { CreateUserController } from './controller/user/createUserController'
import { EditUserController } from './controller/user/editUserController'



const router = Router()

// Routes Dentist

router.post('/CriarDentista', new CreateDentistController().handle)
router.put('/EditarDentista', new EditDentistController().handle)
router.post('/LoginDentista', new AuthDentistController().handle)

// Routes User

router.post('/CriarUsuario', new CreateUserController().handle)
router.put('/EditarUsuario', new EditUserController().handle)
router.post('/LoginUsuario', new AuthUserController().handle)

export { router }