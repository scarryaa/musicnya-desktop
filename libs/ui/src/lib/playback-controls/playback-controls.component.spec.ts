import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaybackControlsComponent } from './playback-controls.component';

describe('PlaybackControlsComponent', () => {
  let component: PlaybackControlsComponent;
  let fixture: ComponentFixture<PlaybackControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaybackControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaybackControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
