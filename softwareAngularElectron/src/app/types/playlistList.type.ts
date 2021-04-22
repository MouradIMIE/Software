export type PlaylistList = {
    "error": string,
    "message": string,
    "playlist": Array<Playlist>,
}

export type Playlist = {
    "title": string,
    "time": string,
    "url": Array<String>,
    "nb_songs": string,
}