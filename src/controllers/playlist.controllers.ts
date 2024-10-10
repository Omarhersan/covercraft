import { Request, Response } from 'express';
import PlaylistModel from '../models/playlist.models';
import { HTTP_STATUS_CODES } from '../types/htpp-status-codes';
import { Playlist as PlaylistType } from '../types/playlist';

class PlaylistControllers {
    
    // Obtener todas las playlists
    async getAll(req: Request, res: Response) {
        try {
            const playlists = await PlaylistModel.find();
            res.send(playlists);
        } catch (e) {
            console.error("Error fetching playlists:", e); 
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }

    // Obtener playlist por ID
    async getById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const playlist = await PlaylistModel.findById(id);
            if (playlist) {
                res.send(playlist);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
        }
    }

    // Crear una nueva playlist
    async create(req: Request, res: Response) {
        const playlistData: PlaylistType = req.body;
        try {
            const newPlaylist = await PlaylistModel.create(playlistData);
            res.status(HTTP_STATUS_CODES.CREATED).send(newPlaylist);
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }

    // Actualizar una playlist existente
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const playlistData: PlaylistType = req.body;
        try {
            const updatedPlaylist = await PlaylistModel.findByIdAndUpdate(id, playlistData, { new: true });
            if (updatedPlaylist) {
                res.send(updatedPlaylist);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }

    // Eliminar una playlist
    async delete(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const deletedPlaylist = await PlaylistModel.findByIdAndDelete(id);
            if (deletedPlaylist) {
                res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
            } else {
                res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            }
        } catch (e) {
            res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
        }
    }
}

const playlistController = new PlaylistControllers();
export default playlistController;
