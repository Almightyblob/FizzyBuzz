import { Component, OnInit } from '@angular/core';
import {FizzbuzzService} from '../../services/fizzbuzz.service';
import {Router} from '@angular/router';
import {Highscore} from '../../models/highscore.model';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.page.html',
  styleUrls: ['./high-scores.page.scss'],
})
export class HighScoresPage implements OnInit{
  highscores: Highscore[] = [];

  constructor(private fizzBuzzService: FizzbuzzService,
              private router: Router) { }

  loadScores() {
    this.fizzBuzzService.storage.get('highscores').then((highscores: Highscore[]) => {
      this.highscores = highscores || [];
    }).then(() => {
      this.highscores.sort((a, b) => {
        return b.score - a.score;
      });
    });
  }

  goToGame(){
    this.router.navigate(['/start-game'], { replaceUrl: true });
  }

  resetScores(){
    this.fizzBuzzService.storage.clear();
    this.loadScores();
  }

  ngOnInit() {
    this.loadScores();
  }
}
