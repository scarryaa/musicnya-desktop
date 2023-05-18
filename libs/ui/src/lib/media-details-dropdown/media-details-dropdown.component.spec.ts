import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaDetailsDropdownComponent } from './media-details-dropdown.component';

describe('MediaDetailsDropdownComponent', () => {
  let component: MediaDetailsDropdownComponent;
  let fixture: ComponentFixture<MediaDetailsDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDetailsDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaDetailsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
