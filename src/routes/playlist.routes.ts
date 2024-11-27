import { Router } from 'express';
import { getAll, getById, create, update, deletePlaylist, addSong } from '../controllers/playlist.controllers';

const playlistRouter = Router();

// Obtener todas las playlists
/**
 * @swagger
 * /playlist:
 *  get:
 *   tags: {playlist}
 *   description: get all playlists
 *   responses:
 *    '200':
 *     description: Returns a document array of the playlist in the database
 *    '500':
 *     description: Internal server error
 */
playlistRouter.get('/', getAll);

// Obtener una playlist por ID
/**
 * @swagger
 * /playlist/{id}:
 *  get:
 *   tags: {playlist}
 *   description: get a playlist by id
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the playlist
 *     required: true
 *     schema:
 *     type: string
 *   responses:
 *    '200':
 *     description: Returns a document of the playlist in the database
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */
playlistRouter.get('/:id', getById);

// Crear una nueva playlist
/**
 * @swagger
 * /playlist:
 *  post:
 *   tags: {playlist}
 *   description: Creates a new playlist
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        playlist_id?:
 *         type: string
 *        name:
 *         type: string
 *        user_id:
 *         type: string
 *        songs:
 *         type: array
 *       example:
 *        name: 'playlist name'
 *        user_id: 'user id'
 *        songs: []
 *   responses:
 *    '201':
 *     description: Returns the created playlist
 *    '400':
 *     description: Bad request
 */
playlistRouter.post('/', create);

// Actualizar una playlist existente
/**
 * @swagger
 * /playlist/{id}:
 *  put:
 *   tags: {playlist}
 *   description: Updates a playlist
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the playlist
 *     required: true
 *     schema:
 *     type: string
 *   responses:
 *    '200':
 *      description: Returns the updated playlist
 *    '404':
 *      description: Not found
 *    '400':
 *      description: Bad request
 * 
 *  
 */
playlistRouter.put('/:id', update);

// Eliminar una playlist
/**
 * @swagger
 * /playlist/{id}:
 *  delete:
 *   tags: {playlist}
 *   description: Deletes a playlist
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the playlist
 *     required: true
 *     schema:
 *     type: string
 *   responses:
 *    '204':
 *      description: No content.Playlist deleted
 *    '404':
 *      description: Not found
 *    '400':
 *      description: Bad request
 * 
 */
playlistRouter.delete('/:id', deletePlaylist);

// Ruta para agregar una canción a una playlist
/**
 * @swagger
 * /playlist/{id}/songs:
 *  post:
 *   tags: {playlist}
 *   description: Add a song to a playlist
 *   parameters:
 *   - in: path
 *     name: id
 *     description: ID of the playlist
 *     required: true
 *     schema:
 *     type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        song_id:
 *         type: string
 *        name:
 *         type: string
 *        artist:
 *         type: string
 *        album:
 *         type: string
 *       example:
 *        song_id: 'song id'
 *        name: 'song name'
 *        artist: 'song artist'
 *        album: 'song album'
 *   responses:
 *    '200':
 *     description: Returns the updated playlist
 *    '404':
 *     description: Not found
 *    '500':
 *     description: Internal server error
 */
playlistRouter.post('/:id/songs', addSong); // Si va ahí el songs?

export default playlistRouter;
