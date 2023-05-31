import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongAlbumDetailsComponent } from './song-album-details.component';

describe('SongAlbumDetailsComponent', () => {
  let component: SongAlbumDetailsComponent;
  let fixture: ComponentFixture<SongAlbumDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongAlbumDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SongAlbumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
