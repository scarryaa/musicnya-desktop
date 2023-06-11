import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerHeroTileComponent } from './banner-hero-tile.component';

describe('BannerHeroTileComponent', () => {
  let component: BannerHeroTileComponent;
  let fixture: ComponentFixture<BannerHeroTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerHeroTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerHeroTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
