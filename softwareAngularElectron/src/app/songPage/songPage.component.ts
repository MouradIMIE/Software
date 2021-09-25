import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SongService } from '../services/song.service';
import { AddSongType } from '../types/addSong.type';
import { SongList, SongElement } from '../types/songList.type'

import * as musicMetadata from 'music-metadata-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'songPage',
    templateUrl: './songPage.component.html',
    styleUrls: ['./songPage.component.scss']
})

export class SongPageComponent implements OnInit {

    songList: Array<SongElement> = [];
    adminConnected = localStorage.getItem('firstname');
    // Variables to stock metadatas 
    filePath: String;
    fileTitle: string;
    fileArtist: string;
    fileDuration: number;
    fileURL: string;
    fileUploadName: string;
    fileYear: string;

    //FormGroup
    addSongForm: FormGroup;
    isSubmitted: boolean = false;

    constructor(private afStorage: AngularFireStorage,
        private router: Router,
        private authService: AuthService,
        private songService: SongService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService) {

    }
    ngOnInit(): void {
        this.getSongs();
    }

    async upload(event) {
        const metadata = await musicMetadata.parseBlob(event.target.files[0]);
        console.log(metadata)
        // This element for the request
        this.filePath = event.target.files[0];
        this.fileUploadName = event.target.files[0].name;
        this.fileTitle = metadata.common.title;
        this.fileArtist = metadata.common.artist;
        this.fileDuration = parseFloat(((metadata.format.duration) / 60).toFixed(2));
        this.fileYear = String(metadata.common.year);
    }

    get formControls() {
        return this.addSongForm.controls;
    }

    //Function to upload songs informations into DataBase and Song to Firebase

    async uploadSong() {
        await this.afStorage.upload(this.fileTitle, this.filePath);
        //FormBuilder
        this.addSongForm = this.formBuilder.group({
            title: this.fileTitle,
            artist: this.fileArtist,
            time: this.fileDuration.toString(),
            url: await this.afStorage.storage.ref(this.fileTitle).getDownloadURL(),
            genre: this.fileYear
        })
        this.isSubmitted = true;
        if (this.addSongForm.invalid) {
            return;
        }
        this.songService.addSong(this.addSongForm.value)
            .pipe()
            .subscribe((data: AddSongType) => {
                this.router.navigateByUrl('/song');
                let elem: SongElement = { artist: '', title: '', genre: '', time: '', url: '' };
                elem.artist = document.getElementById("textAreaArtist").innerHTML;
                elem.title = document.getElementById("textAreaTitle").innerHTML;
                elem.time = document.getElementById("textAreaDuration").innerHTML;
                elem.genre = document.getElementById("textAreaGenre").innerHTML;
                this.songList.push(elem);
                this.toastr.success('You can now close the modal', 'Song successfuly added');
            },
                (error) => {
                    this.toastr.warning(error.error.message)
                }
            )
    }

    // Function to delete Song
    async deleteSong() {
        const table = document.getElementById('songTable');
        console.log(table);
    }

    // await this.afStorage.storage.refFromURL("fafa").delete();


    // Function to get SongURL

    getURLSong() {
        this.afStorage.storage.ref(this.fileTitle).getDownloadURL().then((url) => {
            this.fileURL = url;
        })
    }


    // Function to getSongs from Database
    getSongs(): void {
        this.songService.getSongs(localStorage.getItem('token'))
            .pipe()
            .subscribe((data: SongList) => {
                for (let i = 0; i < data.songs.length; i++) {
                    let elem: SongElement = { artist: '', title: '', genre: '', time: '', url: '' };
                    elem.artist = data.songs[i].artist;
                    elem.title = data.songs[i].title;
                    elem.genre = data.songs[i].genre;
                    elem.time = data.songs[i].time;
                    elem.url = data.songs[i].url;
                    this.songList.push(elem);
                }
                console.log(this.songList);
            })
    }



    // Function to LogOut

    logOut(): void {
        this.authService.logout(localStorage.getItem('token'))
            .pipe()
            .subscribe(data => {
                localStorage.setItem('token', '');
                localStorage.setItem('firstname', '');
                this.router.navigateByUrl('/login');
            });
    }

}