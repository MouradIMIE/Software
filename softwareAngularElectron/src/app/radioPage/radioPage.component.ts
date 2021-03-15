import { Component, OnInit } from "@angular/core";

@Component({ 
    selector: 'radioPage', 
    templateUrl: './radioPage.component.html', 
    styleUrls: ['./radioPage.component.scss'] 
}) 

export class RadioPageComponent implements OnInit{
    isPlaying : boolean = false;
    
    constructor(){

    }

    ngOnInit() : void {
     
    }
    // jouer la radio
    play(){
        this.isPlaying = true;
    }

//mettre la musique en pause
    pause(){
        this.isPlaying = false;
    }
}