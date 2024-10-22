import { Router } from 'express';
import { getAll, getById, create, update, deletePlaylist, addSong } from '../controllers/playlist.controllers';

const playlistRouter = Router();

// Obtener todas las playlists
playlistRouter.get('/', getAll);

// Obtener una playlist por ID
playlistRouter.get('/:id', getById);

// Crear una nueva playlist
playlistRouter.post('/', create);

// Actualizar una playlist existente
playlistRouter.put('/:id', update);

// Eliminar una playlist
playlistRouter.delete('/:id', deletePlaylist);

// Ruta para agregar una canción a una playlist
//playlistRouter.post('/:id/songs', addSong); 

export default playlistRouter;
 