import { NextFunction, Request, RequestHandler, Response } from 'express';
import PlaylistModel from '../models/playlist.models';
import { HTTP_STATUS_CODES } from '../types/htpp-status-codes';
import { Playlist as PlaylistType } from '../types/playlist';
import { Song as Song } from '../types/song';

// Obtener todas las playlists
export const getAll = async (req: Request, res: Response) => {
    try {
        const playlists = await PlaylistModel.find();
        res.status(HTTP_STATUS_CODES.SUCCESS).send(playlists);
    } catch (e) {
        console.error("Error fetching playlists:", e); 
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
};

// Obtener playlist por ID
export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const playlist = await PlaylistModel.findById(id);
        if (playlist) {
            res.status(200).send(playlist);
        } else {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
        }
    } catch (e) {
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
};

// Crear una nueva playlist
export const create = async (req: Request, res: Response) => {
    const playlistData: PlaylistType = req.body;
    try {
        const newPlaylist = await PlaylistModel.create(playlistData);
        res.status(HTTP_STATUS_CODES.CREATED).send(newPlaylist);
    } catch (e) {
        res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
    }
};

// Actualizar una playlist existente
export const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const playlistData: PlaylistType = req.body;
    try {
        const updatedPlaylist = await PlaylistModel.findByIdAndUpdate(id, playlistData, { new: true });
        if (updatedPlaylist) {
            res.status(200).send(updatedPlaylist);
        } else {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
        }
    } catch (e) {
        res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
    }
};

// Eliminar una playlist
export const deletePlaylist = async (req: Request, res: Response) => {
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
};

export const addSong: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params; // ID de la playlist
    const songData: Song = req.body; // Asegúrate de que req.body tenga el tipo correcto

    try {
        // Buscar la playlist por ID
        const playlist = await PlaylistModel.findById(id);
        if (!playlist) {
            res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);
            return;
        }

        // Agregar la canción al arreglo de canciones
        playlist.songs.push(songData);

        // Guardar los cambios en la base de datos
        await playlist.save();
        res.status(200).send(playlist);
    } catch (e) {
        console.error('Error adding song to playlist:', e);
        res.sendStatus(HTTP_STATUS_CODES.SERVER_ERROR);
    }
};
