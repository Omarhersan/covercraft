

const playlistElementsEndpoint = `https://api.spotify.com/v1/playlists/`;


const getPlaylists = async (cookie: any) => {
    const userId = cookie.spotify_user_id;
    const playlistEnpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;    
    const response = await fetch(playlistEnpoint, {
        headers: {
            Authorization: `Bearer ${cookie.spotify_access_token}`,
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