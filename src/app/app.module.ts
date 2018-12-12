import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { BandSearchService } from './bandSearch.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthTokenService } from './auth-token.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { TopTracksComponent } from './top-tracks/top-tracks.component';
import { BandService } from './band-service.service';
import { AudioFeaturesService } from './audio-features.service';
import { AlbumAnalysisComponent } from './album-analysis/album-analysis.component';
import { AlbumService } from './album.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    TopTracksComponent,
    AlbumAnalysisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [AuthTokenService, AlbumService, AudioFeaturesService, BandSearchService, BandService],
  bootstrap: [AppComponent]
})
export class AppModule { }
