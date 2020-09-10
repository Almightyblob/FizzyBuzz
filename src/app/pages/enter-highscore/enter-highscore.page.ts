import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FizzbuzzService} from '../../services/fizzbuzz.service';
import {Highscore} from '../../models/highscore.model';
import {File} from '@ionic-native/file';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {ImagePicker} from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-enter-highscore',
  templateUrl: './enter-highscore.page.html',
  styleUrls: ['./enter-highscore.page.scss'],
})
export class EnterHighscorePage implements OnInit {
  currentImage = '../../assets/images/default-avatar.png';
  highscore: number;
  private form: FormGroup;
  file = File;

  constructor(private camera: Camera,
              private fizzBuzzService: FizzbuzzService,
              private formBuilder: FormBuilder,
              private router: Router,
              private webview: WebView,
              private imagePicker: ImagePicker
              ){
    this.form = this.formBuilder.group({
      name: ['']
    });
  }

  async takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    };

    const tempImage = await this.camera.getPicture(options);

    const tempFilename = tempImage.substr(tempImage.lastIndexOf('/') + 1);
    const tempBaseFilesystemPath = tempImage.substr(0, tempImage.lastIndexOf('/') + 1);
    const newBaseFilesystemPath = this.file.dataDirectory;

    await this.file.copyFile(tempBaseFilesystemPath, tempFilename,
        newBaseFilesystemPath, tempFilename);

    const storedPhoto = newBaseFilesystemPath + tempFilename;
    this.currentImage = this.webview.convertFileSrc(storedPhoto);

  }

  pickFromGallery(){
    const options = {
      maximumImagesCount: 1,
      width: 200,
    };
    this.imagePicker.getPictures(options).then( result => this.currentImage = this.webview.convertFileSrc(result[0])
    );
  }

  save() {
    const newHighscore = {name: this.form.value.name, score: this.highscore, photo: this.currentImage};
    this.fizzBuzzService.storage.get('highscores').then( (highscores: Highscore[])  => {
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
