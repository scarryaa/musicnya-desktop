import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryFiltersComponent } from './library-filters.component';

describe('LibraryFiltersComponent', () => {
  let component: LibraryFiltersComponent;
  let fixture: ComponentFixture<LibraryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibraryFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
