import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionsButtonComponent } from './options-button.component';

describe('OptionsButtonComponent', () => {
  let component: OptionsButtonComponent;
  let fixture: ComponentFixture<OptionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
