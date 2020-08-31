import { Component, OnInit } from '@angular/core';
import {FizzbuzzService} from '../../services/fizzbuzz.service';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.page.html',
  styleUrls: ['./high-scores.page.scss'],
})
export class HighScoresPage implements OnInit{
  highscores;

  constructor(private fizzBuzzService: FizzbuzzService) { }

  ngOnInit() {
    console.log('INIT');
    this.highscores = this.fizzBuzzService.highscores
  }

  ionViewWillEnter(){
    this.highscores.sort((a, b) => {
      return b.score - a.score;
    });
  }
}
