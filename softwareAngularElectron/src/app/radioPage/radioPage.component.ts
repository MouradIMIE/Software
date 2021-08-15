import { Component, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import Pizzicato from 'pizzicato';
import { Socket } from 'ngx-socket-io';

@Component({
    selector: 'radioPage',
    templateUrl: './radioPage.component.html',
    styleUrls: ['./radioPage.component.scss']
})

export class RadioPageComponent implements OnInit {

    adminConnected = localStorage.getItem('firstname');
    isPlaying: boolean = false;
    isLive: boolean = false;
    message : string;
    public voice: any;
    @Input() src ='';
    constructor(private socket: Socket,private router: Router, private authService: AuthService, private toastr: ToastrService) {

    }

    ngOnInit(): void {
        let reader = new FileReader()
        this.socket.on("document", (data) => {
            console.log(data) //rarraybuffer
            const blob = new Blob([data], { type: "audio/wav" });
            reader.readAsDataURL(blob);//url
            let self = this;
            reader.onloadend = (progressEvent) => {
                console.log('stop test', reader.result)
                //this.src=(window.URL ? URL : webkitURL).createObjectURL(blob);

                // console.log(reader)
                //this.src =reader.result.toString();
            }
        })
    }

    
    getMessage() : void {
        this.message = (<HTMLInputElement>document.getElementById('message')).value;
        this.socket.emit("message",this.message);
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