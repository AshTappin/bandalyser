import { Component, Input, OnInit } from '@angular/core';
import * as CanvasJS from '../top-tracks/canvasjs.min.js';
import { BandService } from '../band-service.service';
import { AlbumService } from '../album.service';
import { AudioFeaturesService } from '../audio-features.service';
import * as moment from 'moment';
import { flatMap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-album-analysis',
  templateUrl: './album-analysis.component.html',
  styleUrls: ['./album-analysis.component.css']
})
export class AlbumAnalysisComponent implements OnInit {

  @Input()
  bandId: string;

  albums: any[];

  energyDatapoints: any[] = [];
  danceabilityDatapoints: any[] = [];
  valenceDatapoints: any[] = [];
  livenessDatapoints: any[] = [];

  constructor(
    private bandService: BandService,
    private albumService: AlbumService,
    private audioFeatures: AudioFeaturesService) { }

  ngOnInit() {

    this.bandService.getAlbums(this.bandId)
      .subscribe((response: any) => {
        this.albums = response.items;
        this.albums
          .filter(album => !album.name.includes('Deluxe'))
          .forEach(album => {

          this.albumService.getTracks(album.id)
            .pipe(flatMap((response: any) => this.audioFeatures.getAudioFeaturesForTracks(response.items.map(track => track.id))))
            .subscribe((response: any )=> {
                const energyForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.energy);
                const energyAverage = energyForAllTracks.reduce((a,b) => a + b, 0) / energyForAllTracks.length;
                this.energyDatapoints.push(this.createDataPoint(album, energyAverage));
                this.energyDatapoints = this.energyDatapoints.sort(this.sortByDate());

                const danceabilityForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.danceability);
                const danceabilityAverage = danceabilityForAllTracks.reduce((a,b) => a + b, 0) / danceabilityForAllTracks.length;
                this.danceabilityDatapoints.push(this.createDataPoint(album, danceabilityAverage));
                this.danceabilityDatapoints = this.danceabilityDatapoints.sort(this.sortByDate());

                const valenceForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.valence);
                const valenceAverage = valenceForAllTracks.reduce((a,b) => a + b, 0) / valenceForAllTracks.length;
                this.valenceDatapoints.push(this.createDataPoint(album, valenceAverage));
                this.valenceDatapoints = this.valenceDatapoints.sort(this.sortByDate());

                const livenessForAllTracks = response.audio_features.map(audioFeatures => audioFeatures.liveness);
                const livenessAverage = livenessForAllTracks.reduce((a,b) => a + b, 0) / livenessForAllTracks.length;
                this.livenessDatapoints.push(this.createDataPoint(album, livenessAverage));
                this.livenessDatapoints = this.livenessDatapoints.sort(this.sortByDate());

                this.drawGraph();
              });
          })
        });



  }

  createDataPoint(album: any, metric: number) {
    return {
      y: metric,
      x:  moment(album.release_date, 'YYYY-MM-DD').toDate(),
      name: album.name,
      toolTipContent: "{name}: {x}",
      cursor: "pointer",
      urlToGo: album.external_urls.spotify,
      click: this.onDataPointClick
    }
  }

  onDataPointClick(e) {
    window.open(e.dataPoint.urlToGo, "_blank");
  }

  sortByDate() {
    return  (last, next) => {
      if (last.x < next.x) {
        return -1;
      }
      if (last.x > next.x) {
        return 1;
      }
      return 0;
    };
  }

  drawGraph() {
    console.log("drawing graph");
    let chart = new CanvasJS.Chart("albumAnalysisChartContainer", {
      theme: 'dark1',
      animationDuration: 3000,
      animationEnabled: true,
      axisX: {
        valueFormatString: "MMM YYYY"
      },
      axisY: {
        gridThickness: 0
      },
      legend: {
        cursor: "pointer",
        verticalAlign: "top",
        horizontalAlign: "center",
        dockInsidePlotArea: true,
      },
      data: [{
        type: "line",
        name: "energy",
        showInLegend: true,
        dataPoints:this.energyDatapoints
      }, {
        type: "line",
        name: "danceability",
        showInLegend: true,
        dataPoints:this.danceabilityDatapoints
      },{
        type: "line",
        name: "valence",
        showInLegend: true,
        dataPoints:this.valenceDatapoints
      },
        {
          type: "line",
          name: "liveness",
          showInLegend: true,
          dataPoints:this.livenessDatapoints
        }
      ]
    });

    chart.render();
  }

}
