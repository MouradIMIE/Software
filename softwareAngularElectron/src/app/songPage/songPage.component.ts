import { Component, OnInit } from "@angular/core";
import { AngularFireStorage } from '@angular/fire/storage';
import * as musicMetadata from 'music-metadata-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'songPage',
    templateUrl: './songPage.component.html',
    styleUrls: ['./songPage.component.scss']
})

export class SongPageComponent implements OnInit {
    filePath: String;
    fileTitle: string;
    fileArtist: string;
    fileDuration: number;
    fileURL: string;
    fileUploadName: string;

    constructor(private afStorage: AngularFireStorage,
        private router: Router,
        private authService: AuthService,
        private toastr: ToastrService) {

    }

    async upload(event) {
        const metadata = await musicMetadata.parseBlob(event.target.files[0]);
        console.log(metadata);
        this.filePath = event.target.files[0];
        this.fileUploadName = event.target.files[0].name;
        this.fileTitle = metadata.common.title;
        this.fileArtist = metadata.common.artist;
        this.fileDuration = (metadata.format.duration) / 60;
    }

    uploadSong() {
        this.afStorage.upload(this.fileTitle, this.filePath);
        this.toastr.success('You can now close the modal','Song successfuly added');
    }

    getURLSong() {
        this.afStorage.storage.ref(this.fileTitle).getDownloadURL().then((url) => {
            this.fileURL = url;
        })
    }

    ngOnInit(): void {

    }

    logOut(): void {
        this.authService.logout(localStorage.getItem('token'))
            .pipe()
            .subscribe(data => {
                localStorage.setItem('token', '');
                this.router.navigateByUrl('/login');
            });
    }

}