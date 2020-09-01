import {BehaviorSubject, interval, Observable, Subject, Subscription, zip} from 'rxjs';
import {map, share, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Highscore} from '../models/highscore.model';

@Injectable()
export class FizzbuzzService {

    numbers$: Observable<number> = interval(2000).pipe(
        map(n => n += 1),
    );

    fizz$: Observable<'Fizz'> = this.numbers$.pipe(
        map(n => (n % 3 === 0) ? 'Fizz' : null)
    );

    buzz$: Observable<'Buzz'> = this.numbers$.pipe(
        map(n => (n % 5 === 0) ? 'Buzz' : null)
    );
    fizzBuzz$ = zip<[number, string, string ]>(
        this.numbers$, this.fizz$, this.buzz$
    )
        .pipe(
            map(arr => (arr.filter( item => item !== null))
            ),
            tap(console.log),
            share()
        );

    highscore$ = new BehaviorSubject<number>(0);
    highscores: Highscore[] = [];
}

