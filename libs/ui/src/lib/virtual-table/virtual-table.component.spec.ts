import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VirtualTableComponent } from './virtual-table-presentation.component';

describe('VirtualTableComponent', () => {
  let component: VirtualTableComponent;
  let fixture: ComponentFixture<VirtualTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VirtualTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
