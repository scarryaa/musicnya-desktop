import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicComponentLoaderComponent } from './dynamic-component-loader.component';

describe('DynamicComponentLoaderComponent', () => {
  let component: DynamicComponentLoaderComponent;
  let fixture: ComponentFixture<DynamicComponentLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicComponentLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicComponentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
