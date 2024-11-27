import { Router } from "express";
import {getPlaylists, getPlaylistElements} from '../services/spotify.services'

const spotifyRouter = Router();

spotifyRouter.get('/playlist', (req, res) => {
    getPlaylists(req.cookies).then((data) => {
        res.json(data);
    });
});


spotifyRouter.get('/playlist/:playlist_id', (req, res) => {
    getPlaylistElements(req.cookies, req.params.playlist_id).then((data) => {
        data.items.map((item: any) => {
            return {
                name: item.track.name,
                artist: item.track.artists[0].name,
                album: item.track.album.name,
            };
        });
    });
});

export default spotifyRouter;
