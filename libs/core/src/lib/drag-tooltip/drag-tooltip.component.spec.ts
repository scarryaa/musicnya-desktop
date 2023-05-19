import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragTooltipComponent } from './drag-tooltip.component';

describe('DragTooltipComponent', () => {
  let component: DragTooltipComponent;
  let fixture: ComponentFixture<DragTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragTooltipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
