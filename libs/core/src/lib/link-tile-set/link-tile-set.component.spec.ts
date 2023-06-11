import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkTileSetComponent } from './link-tile-set.component';

describe('LinkTileSetComponent', () => {
  let component: LinkTileSetComponent;
  let fixture: ComponentFixture<LinkTileSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkTileSetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkTileSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
