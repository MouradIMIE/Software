import { Component } from "@angular/core";
import { SongService } from '../services/song.service';
import { AddSongType } from '../types/addSong.type';
import { SongList, SongElement } from '../types/songList.type';
import { PlaylistList, Playlist } from '../types/playlistList.type';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'programs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})

export class ProgramsComponent {

  adminConnected = localStorage.getItem('firstname');
  songList: Array<SongElement> = [];
  playlistList: Array<Playlist> = [];
  inputTitle: string;
  inputTime: string;
  inputNbSongs: string;
  addPlaylistForm: FormGroup;
  isSubmitted: boolean = false;
  selectedSong: Array<String>;
  Song: Array<String> = [];
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  constructor(private modal: NgbModal, private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private songService: SongService,
    private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getSongs();
    this.getPlaylist();
    this.addPlaylistForm = this.formBuilder.group({
      title: ['', Validators.required],
      nb_songs: ['', Validators.required],
      time: ['', Validators.required],
      url: [''],
    })
  }

  get formControls() {
    return this.addPlaylistForm.controls;
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
      })
  }

  public getUrl() {
    for (let i = 0; i < this.selectedSong.length; i++) {
      if (!this.Song.includes(this.selectedSong[i])) {
        this.Song.push(this.selectedSong[i]);
      }
    }
    for (let j = 0; j < this.Song.length; j++) {
      if (!this.selectedSong.includes(this.Song[j])) {
        this.Song.splice(j, 1);
      }
    }
    console.log(this.Song)
  }


  // Create Playlist and add it to DataBase
  createPlaylist(): void {
    this.isSubmitted = true;
    if (this.addPlaylistForm.invalid) {
      return;
    }
    let elem: Playlist = { title: '', time: '', nb_songs: '', url: [] };
    elem.title = this.inputTitle
    elem.time = this.inputTime;
    elem.nb_songs = this.inputNbSongs;
    for (let i = 0; i < this.Song.length; i++) {
      elem.url.push(this.Song[i]);
    }
    this.playlistList.push(elem);
    this.songService.addPlaylist(elem)
      .pipe()
      .subscribe((data: PlaylistList) => {
        console.log(data.playlist)

        this.toastr.success('You can now close the modal', 'New admin added');
        console.log(elem);
      },
        (error) => {
          this.toastr.warning(error.error.message)
        }
      );
  }

  getPlaylist(): void {
    this.songService.getPlaylist(localStorage.getItem('token'))
      .pipe()
      .subscribe((data: PlaylistList) => {
        for (let i = 0; i < data.playlist.length; i++) {
          let elem: Playlist = { title: '', nb_songs: '', time: '', url: [] };
          elem.title = data.playlist[i].title;
          elem.nb_songs = data.playlist[i].nb_songs;
          elem.time = data.playlist[i].time;
          this.playlistList.push(elem);
        }
      })
  }


  // -----------------------------------------------------------------------------------------------------------
  //                                               CALENDAR
  // -----------------------------------------------------------------------------------------------------------                                         CALENDAR
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  activeDayIsOpen: boolean = true;


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  // -----------------------------------------------------------------------------------------------------------
  //                                               DUPLICATE DIV DATE PICKER
  // -----------------------------------------------------------------------------------------------------------  
  duplicateDatePicker(): void {
    var itm = document.getElementById("datePickerDiv").lastChild;
    var cln = itm.cloneNode(true);
    document.getElementById("datePickerDiv").appendChild(cln);
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

}