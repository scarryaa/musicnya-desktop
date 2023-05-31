import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturedTileComponent } from './featured-tile.component';

describe('FeaturedTileComponent', () => {
  let component: FeaturedTileComponent;
  let fixture: ComponentFixture<FeaturedTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
