import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
    selector: 'radioPage',
    templateUrl: './radioPage.component.html',
    styleUrls: ['./radioPage.component.scss']
})

export class RadioPageComponent implements OnInit {
    isPlaying: boolean = false;
    isLive: boolean = false;
    constructor(private router: Router, private authService: AuthService) {

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

    // jouer la radio
    play() {
        this.isPlaying = true;
    }

    //mettre la musique en pause

    pause() {
        this.isPlaying = false;
    }

    goLive() {
        this.isLive = true;
    }

    pauseLive() {
        this.isLive = false;
    }
}