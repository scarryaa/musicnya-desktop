import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TileSelectorComponent } from './tile-selector.component';

describe('TileSelectorComponent', () => {
  let component: TileSelectorComponent;
  let fixture: ComponentFixture<TileSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TileSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TileSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
