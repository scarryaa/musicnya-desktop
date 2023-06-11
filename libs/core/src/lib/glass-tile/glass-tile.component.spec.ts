import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlassTileComponent } from './glass-tile.component';

describe('GlassTileComponent', () => {
  let component: GlassTileComponent;
  let fixture: ComponentFixture<GlassTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlassTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlassTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
