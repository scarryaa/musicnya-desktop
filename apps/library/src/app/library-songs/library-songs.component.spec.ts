import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrarySongsComponent } from './library-songs.component';

describe('LibrarySongsComponent', () => {
  let component: LibrarySongsComponent;
  let fixture: ComponentFixture<LibrarySongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibrarySongsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LibrarySongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
