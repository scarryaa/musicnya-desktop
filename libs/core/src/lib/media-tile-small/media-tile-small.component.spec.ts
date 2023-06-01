import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaTileSmallComponent } from './media-tile-small.component';

describe('MediaTileSmallComponent', () => {
  let component: MediaTileSmallComponent;
  let fixture: ComponentFixture<MediaTileSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTileSmallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTileSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
