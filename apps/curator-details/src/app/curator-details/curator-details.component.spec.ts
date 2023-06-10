/* eslint-disable functional/no-let */
/* eslint-disable functional/no-expression-statements */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistDetailsComponent } from './curator-details.component';

describe('ArtistDetailsComponent', () => {
  let component: ArtistDetailsComponent;
  let fixture: ComponentFixture<ArtistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
