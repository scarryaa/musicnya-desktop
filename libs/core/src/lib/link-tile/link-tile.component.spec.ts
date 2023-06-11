import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LinkTileComponent } from './link-tile.component';

describe('LinkTileComponent', () => {
  let component: LinkTileComponent;
  let fixture: ComponentFixture<LinkTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
