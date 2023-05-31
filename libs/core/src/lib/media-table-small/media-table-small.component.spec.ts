import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaTableSmallComponent } from './media-table-small.component';

describe('MediaTableSmallComponent', () => {
  let component: MediaTableSmallComponent;
  let fixture: ComponentFixture<MediaTableSmallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaTableSmallComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaTableSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
