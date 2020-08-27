import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-enter-highscore',
  templateUrl: './enter-highscore.page.html',
  styleUrls: ['./enter-highscore.page.scss'],
})
export class EnterHighscorePage implements OnInit {
  currentImage: any;

  constructor(private camera: Camera){ }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log('Camera issue:' + err);
    });
  }

  ngOnInit() {
  }

}
