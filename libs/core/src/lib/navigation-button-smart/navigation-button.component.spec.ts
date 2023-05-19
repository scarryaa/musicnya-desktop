import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationButtonSmartComponent } from './navigation-button.component';

describe('NavigationButtonComponent', () => {
  let component: NavigationButtonSmartComponent;
  let fixture: ComponentFixture<NavigationButtonSmartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationButtonSmartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationButtonSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
