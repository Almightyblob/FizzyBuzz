import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HighScoresPage } from './high-scores.page';

const routes: Routes = [
  {
    path: '',
    component: HighScoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HighScoresPageRoutingModule {}
