import { Song } from './song';

export interface Playlist {
    playlist_id?: string;
    name: string;
    user_id: string;
    songs: Song[]; // Aquí definimos que es un arreglo de canciones
}
