/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlbumTileComponent } from './album-tile.component';

describe('AlbumTileComponent', () => {
  let component: AlbumTileComponent;
  let fixture: ComponentFixture<AlbumTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
