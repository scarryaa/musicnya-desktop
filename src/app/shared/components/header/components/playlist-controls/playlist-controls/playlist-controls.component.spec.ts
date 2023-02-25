import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistControlsComponent } from './playlist-controls.component';

describe('PlaylistControlsComponent', () => {
  let component: PlaylistControlsComponent;
  let fixture: ComponentFixture<PlaylistControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
