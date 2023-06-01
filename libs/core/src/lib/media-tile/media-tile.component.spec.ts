import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaTileComponent } from './media-tile.component';

describe('MediaTileComponent', () => {
  let component: MediaTileComponent;
  let fixture: ComponentFixture<MediaTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
