import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterHighscorePage } from './enter-highscore.page';

describe('EnterHighscorePage', () => {
  let component: EnterHighscorePage;
  let fixture: ComponentFixture<EnterHighscorePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterHighscorePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterHighscorePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
