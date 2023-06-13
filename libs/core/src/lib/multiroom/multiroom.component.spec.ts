import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiroomComponent } from './multiroom.component';

describe('MultiroomComponent', () => {
  let component: MultiroomComponent;
  let fixture: ComponentFixture<MultiroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiroomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
