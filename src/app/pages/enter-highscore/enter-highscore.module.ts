import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterHighscorePageRoutingModule } from './enter-highscore-routing.module';

import { EnterHighscorePage } from './enter-highscore.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        EnterHighscorePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [EnterHighscorePage]
})
export class EnterHighscorePageModule {}
