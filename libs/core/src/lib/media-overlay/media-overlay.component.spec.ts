import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaOverlayComponent } from './media-overlay.component';

describe('MediaOverlayComponent', () => {
  let component: MediaOverlayComponent;
  let fixture: ComponentFixture<MediaOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
