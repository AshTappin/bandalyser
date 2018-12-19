import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AnalysisResultsComponent } from './analysis-results/analysis-results.component';

export const routes: Routes = [
  {path: '', component: HomeComponent, data : {state: 'home'}},
  {path: 'toptracks/:bandid', component: AnalysisResultsComponent, data : {state: 'toptracks'}}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
