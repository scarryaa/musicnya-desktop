import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongAlbumContentComponent } from './song-album-content.component';

describe('SongAlbumContentComponent', () => {
  let component: SongAlbumContentComponent;
  let fixture: ComponentFixture<SongAlbumContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongAlbumContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongAlbumContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
