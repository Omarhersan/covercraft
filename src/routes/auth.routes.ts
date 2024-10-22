import { Router } from 'express';
import { signup, login } from '../controllers/auth.controllers';

const authRouter = Router();

// not ready yet
// Ruta de registro
//authRouter.post('/signup', signup);

// not ready yet
// Ruta de inicio de sesión
//authRouter.post('/login', login); 
export default authRouter;
