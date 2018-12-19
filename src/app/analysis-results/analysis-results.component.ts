import { Component, OnInit } from '@angular/core';
import { BandService } from '../band-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-top-tracks',
  templateUrl: './analysis-results.component.html',
  styleUrls: ['./analysis-results.component.css']
})
export class AnalysisResultsComponent implements OnInit {
  bandName: string;
  bandId: string;
  bandImageLink: string;


  constructor(private bandService: BandService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.bandId = params['bandid'];
      this.bandService.getBand(this.bandId).subscribe((result: any) => {
        this.bandName = result['name'];
        this.bandImageLink = result.images['0'].url;
      });
    });

  }
}
