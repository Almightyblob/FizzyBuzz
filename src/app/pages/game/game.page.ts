import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {FizzbuzzService} from '../../services/fizzbuzz.service';
import {fromEvent, interval, Observable, of, Subject} from 'rxjs';
import {
    mapTo,
    merge,
    switchMap,
    distinctUntilChanged,
    map,
    filter, scan, tap, share, take,
} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit, AfterViewInit {
  title = 'fizzbuzz';

  fizzBuzz$: Observable<[]>;
  result$: Observable<boolean>;
  points$: Observable<number>;
  fails$: Observable<number>;
  userInput$: Observable<unknown>;

  @ViewChild('fizz', {static: true, read: ElementRef}) fizzButton: ElementRef;
  @ViewChild('buzz', {static: true, read: ElementRef}) buzzButton: ElementRef;
  @ViewChild('fizzBuzz', {static: true, read: ElementRef}) fizzBuzzButton: ElementRef;

  constructor(private fizzbuzzService: FizzbuzzService, private router: Router) { }
  ngOnInit() {
    this.fizzBuzz$ = this.fizzbuzzService.fizzBuzz$;
    this.fizzbuzzService.highscore$.next(0);
  }

  ngAfterViewInit() {
    const fizzBet$ = fromEvent(this.fizzButton.nativeElement, 'click');
    const buzzBet$ = fromEvent(this.buzzButton.nativeElement, 'click');
    const fizzBuzzBet$ = fromEvent(this.fizzBuzzButton.nativeElement, 'click');

    this.userInput$ = of().pipe(merge(
        fizzBet$.pipe(mapTo('Fizz')),
        buzzBet$.pipe(mapTo('Buzz')),
        fizzBuzzBet$.pipe(mapTo('FizzBuzz')),
        interval(1990).pipe(mapTo('None'))),
        distinctUntilChanged(),
        share()
    );

    this.result$ = this.fizzBuzz$
        .pipe(
            switchMap(currentFizz => this.userInput$.pipe(
                map( input => {
                  if (currentFizz.length <= 1 || input === 'None'){
                    return null;
                  } else if (currentFizz.slice(1).join('') === input) {
                      return true;
                  } else if (currentFizz.slice(1).join('') !== input) {
                      return false;
                  }
                }),
                share()
            ))
        );

    this.points$ = this.result$.pipe(
        filter(result => result === true),
        mapTo(1),
        scan((acc, one) => acc + one, 0),
        tap( score => this.fizzbuzzService.highscore$.next(score)),
        share());
    this.fails$ = this.result$.pipe(
        filter(result => result === false),
        mapTo(1),
        scan((acc, one) => acc + one, 0),
        tap(x => {
              if (x >= 3) {
                  this.router.navigate(['/enter-highscore'], {replaceUrl: true });
              }
            }
        ),
        share()
    );
  }

}
