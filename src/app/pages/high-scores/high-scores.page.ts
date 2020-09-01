import { Component, OnInit } from '@angular/core';
import {FizzbuzzService} from '../../services/fizzbuzz.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.page.html',
  styleUrls: ['./high-scores.page.scss'],
})
export class HighScoresPage implements OnInit{
  highscores;

  constructor(private fizzBuzzService: FizzbuzzService,
              private router: Router) { }

  loadScores() {
    this.fizzBuzzService.storage.get('highscores').then((highscores) => {
      this.highscores = highscores || [];
      console.log(highscores);
    });
  }

  goToGame(){
    this.router.navigate(['/start-game'], { replaceUrl: true });
  }

  resetScores(){
    this.fizzBuzzService.storage.clear().then(() => {
        this.highscores = [];
      });
  }

  ngOnInit() {
    console.log('INIT');
    this.loadScores();
  }
}
