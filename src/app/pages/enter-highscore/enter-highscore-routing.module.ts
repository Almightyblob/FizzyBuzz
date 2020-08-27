import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterHighscorePage } from './enter-highscore.page';

const routes: Routes = [
  {
    path: '',
    component: EnterHighscorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterHighscorePageRoutingModule {}
