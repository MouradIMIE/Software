import { Component, OnInit } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import * as musicMetadata from 'music-metadata-browser';

@Component({
    selector: 'songPage',
    templateUrl: './songPage.component.html',
    styleUrls: ['./songPage.component.scss']
})

export class SongPageComponent implements OnInit {
    filePath: String;
    fileTitle: string;
    fileArtist : string;
    fileDuration: number;
    fileURL: string;

    constructor(private afStorage: AngularFireStorage) {

    }

    async upload(event) {
        const metadata = await musicMetadata.parseBlob(event.target.files[0]);
        console.log(metadata);
        this.filePath = event.target.files[0];
        this.fileTitle = metadata.common.title;
        this.fileArtist = metadata.common.artist;
        this.fileDuration = (metadata.format.duration)/60;
    }

    uploadSong() {
        this.afStorage.upload(this.fileTitle, this.filePath);
        this.afStorage.storage.ref(this.fileTitle).getDownloadURL().then((url)=>{
            this.fileURL = url;
        })
    }

    ngOnInit(): void {

    }

}