import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighScoresPageRoutingModule } from './high-scores-routing.module';

import { HighScoresPage } from './high-scores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HighScoresPageRoutingModule
  ],
  declarations: [HighScoresPage]
})
export class HighScoresPageModule {}
