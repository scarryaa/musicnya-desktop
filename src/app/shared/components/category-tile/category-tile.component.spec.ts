import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTileComponent } from './category-tile.component';

describe('CategoryTileComponent', () => {
  let component: CategoryTileComponent;
  let fixture: ComponentFixture<CategoryTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
