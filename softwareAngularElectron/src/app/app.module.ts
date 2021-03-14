import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AppRoutingModule } from './app-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material'
import { NgMetro4Module } from 'ng-metro4';
import { ChartsModule } from 'ng2-charts';

import { LoginComponent } from './Login/login.component';
import { RadioPageComponent } from './radioPage/radioPage.component'; 
import { AdminPageComponent } from './adminPage/adminPage.component';
import { SongPageComponent } from './songPage/songPage.component';
import { ProgramsComponent } from './programs/programs.component';
import { StatisticsComponent } from './statistics/statistics.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RadioPageComponent,
    AdminPageComponent,
    SongPageComponent,
    ProgramsComponent,
    StatisticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    NgMetro4Module,
    ChartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports : [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
