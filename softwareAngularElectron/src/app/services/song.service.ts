import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SongInterface } from '../interfaces/song.interface'
@Injectable({
    providedIn: 'root'
})

export class SongService {
    constructor(private httpClient: HttpClient) {

    }

    addSong( song: SongInterface): Observable<object> {
        let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
        return this.httpClient.post("https://api-radio-world.herokuapp.com/song/addSong", {
            'title': song.title,
            'artist': song.artist,
            'url': song.url,
            'time': song.time,
            'genre': song.genre
        },
            { headers: headers }
        );
    }

    getSongs(token: string): Observable<object> {
        const headers = { 'Authorization': 'Bearer ' + token };
        return this.httpClient.get("https://api-radio-world.herokuapp.com/song/getSongs", { headers });
    }
}