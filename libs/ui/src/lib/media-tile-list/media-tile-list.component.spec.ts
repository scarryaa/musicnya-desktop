import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaTileListComponent } from './media-tile-list.component';

describe('MediaTileListComponent', () => {
  let component: MediaTileListComponent;
  let fixture: ComponentFixture<MediaTileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTileListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
