import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistDetailsContentComponent } from './artist-details-content.component';

describe('ArtistDetailsContentComponent', () => {
  let component: ArtistDetailsContentComponent;
  let fixture: ComponentFixture<ArtistDetailsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistDetailsContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistDetailsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
