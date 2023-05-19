import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationButtonPresentationComponent } from './navigation-button-presentation.component';

describe('NavigationButtonPresentationComponent', () => {
  let component: NavigationButtonPresentationComponent;
  let fixture: ComponentFixture<NavigationButtonPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationButtonPresentationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationButtonPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
