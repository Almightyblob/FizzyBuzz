import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FizzbuzzService} from '../../services/fizzbuzz.service';

@Component({
  selector: 'app-enter-highscore',
  templateUrl: './enter-highscore.page.html',
  styleUrls: ['./enter-highscore.page.scss'],
})
export class EnterHighscorePage implements OnInit {
  currentImage = '../../assets/images/default-avatar.png';
  highscore: number;
  private form: FormGroup;

  constructor(private camera: Camera,
              private fizzBuzzService: FizzbuzzService,
              private formBuilder: FormBuilder,
              private router: Router
              ){
    this.form = this.formBuilder.group({
      name: ['']
    });
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log('Camera issue:' + err);
    });
  }

  save() {
    const newHighscore = {name: this.form.value.name, score: this.highscore, photo: this.currentImage};
    this.fizzBuzzService.storage.get('highscores').then( highscores => {
      if (Array.isArray(highscores)){
        this.fizzBuzzService.storage.set('highscores', [...highscores, newHighscore]);
        console.log(highscores);
      } else {
        this.fizzBuzzService.storage.set('highscores', [newHighscore]);
      }
    }).then(() => this.router.navigate(['/high-scores'], {replaceUrl: true}));
  }

  ngOnInit() {
    this.highscore = this.fizzBuzzService.highscore$.value;
  }

}
