import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import {
  MoviesComponent,
  AppComponent,
  ListComponent,
  ListsComponent,
  HeaderComponent,
  YoutubePlayer,
  MovieComponent,
  SearchComponent,
  FiltersComponent,
  AddNewComponent,
  YourRatingDialogComponent,
} from './components';

import { StringToArrayPipe, ConvertRuntimePipe, IsIdInMovieCollectionPipe } from './pipes';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieComponent,
    ListComponent,
    ListsComponent,
    HeaderComponent,
    SearchComponent,
    FiltersComponent,
    AddNewComponent,
    YourRatingDialogComponent,
    YoutubePlayer,
    StringToArrayPipe,
    ConvertRuntimePipe,
    IsIdInMovieCollectionPipe,
    LoginFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    YouTubePlayerModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
