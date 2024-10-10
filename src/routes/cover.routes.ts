import { Router } from 'express';
import coverController from '../controllers/cover.controllers';

const coverRouter = Router();

// Obtener todas las covers
coverRouter.get('/', coverController.getAll);

// Obtener una cover por ID
coverRouter.get('/:id', coverController.getById);

// Crear una nueva cover
coverRouter.post('/', coverController.create);

// Actualizar una cover existente
coverRouter.put('/:id', coverController.update);

// Eliminar una cover
coverRouter.delete('/:id', coverController.delete);

export default coverRouter;
