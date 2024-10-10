import { Router } from 'express';
import playlistController from '../controllers/playlist.controllers';

const playlistRouter = Router();

// Obtener todas las playlists
playlistRouter.get('/', playlistController.getAll);

// Obtener una playlist por ID
playlistRouter.get('/:id', playlistController.getById);

// Crear una nueva playlist
playlistRouter.post('/', playlistController.create);

// Actualizar una playlist existente
playlistRouter.put('/:id', playlistController.update);

// Eliminar una playlist
playlistRouter.delete('/:id', playlistController.delete);

export default playlistRouter;
