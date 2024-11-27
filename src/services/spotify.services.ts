import { get } from "http";

const userId = ''
const playlistEnpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;


const getPlaylists = async (accessToken: string) => {
    const response = await fetch(playlistEnpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.json();
}

const getPlaylistElements = async (accessToken: string, playlistId: string) => {
    const playlistEnpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const response = await fetch(playlistEnpoint, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return response.json();
}

export { getPlaylists, getPlaylistElements };