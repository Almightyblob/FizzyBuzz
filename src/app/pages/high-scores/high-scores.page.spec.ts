import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HighScoresPage } from './high-scores.page';

describe('HighScoresPage', () => {
  let component: HighScoresPage;
  let fixture: ComponentFixture<HighScoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighScoresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HighScoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
