import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Pizzicato from 'pizzicato'

@Component({
    selector: 'radioPage',
    templateUrl: './radioPage.component.html',
    styleUrls: ['./radioPage.component.scss']
})

export class RadioPageComponent implements OnInit {

    adminConnected = localStorage.getItem('firstname');
    isPlaying: boolean = false;
    isLive: boolean = false;
    public voice: any;

    constructor(private router: Router, private authService: AuthService,private toastr: ToastrService) {

    }

    ngOnInit(): void {

    }

    logOut(): void {
        this.authService.logout(localStorage.getItem('token'))
            .pipe()
            .subscribe(data => {
                localStorage.setItem('token', '');
                localStorage.setItem('firstname', '');
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
        this.voice = new Pizzicato.Sound({
            source: 'input',
            options: { volume: 1 }
        }, () => {
            this.voice.play();
            this.toastr.success("Record on");
        });
    }

    pauseLive() {
        this.isLive = false;
        this.voice.stop();
        this.toastr.success("Record off");
    }
}