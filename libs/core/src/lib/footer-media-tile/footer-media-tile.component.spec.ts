import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterMediaTileComponent } from './footer-media-tile.component';

describe('FooterMediaTileComponent', () => {
  let component: FooterMediaTileComponent;
  let fixture: ComponentFixture<FooterMediaTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterMediaTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterMediaTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
