export type SongList = {
    "error": string,
    "songs": Array<SongElement>,
}

export type SongElement = {
    "artist": string,
    "title": string,
    "genre": string,
    "time": string,
    "url": string,
}