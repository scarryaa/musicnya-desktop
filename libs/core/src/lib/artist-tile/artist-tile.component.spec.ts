import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistTileComponent } from './artist-tile.component';

describe('ArtistTileComponent', () => {
  let component: ArtistTileComponent;
  let fixture: ComponentFixture<ArtistTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
