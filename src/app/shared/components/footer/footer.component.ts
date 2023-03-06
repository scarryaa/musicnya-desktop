import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PlaybackService } from 'ngx-apple-music';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
}
)

export class FooterComponent implements OnInit, AfterViewInit {
  constructor(private playbackService: PlaybackService, private ref: ChangeDetectorRef) {
    this.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    this.iconColor = getComputedStyle(document.documentElement).getPropertyValue('--ui-color-override');
  }

  ngOnInit(): void {
    this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    this.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    this.iconColor = getComputedStyle(document.documentElement).getPropertyValue('--ui-color-override');
    this.volumeValue.valueChanges.subscribe((value) => {
      // we know the user manually did this, because it 
      // would be muted already if the mute btn was pressed
      if (value == 0 && !this.volMuted) {
        this.volStoredValue = 0;
        this.volMuted = true;
      }
      else if (value != 0 && this.volMuted) {
        this.volMuted = false;
      }
    }
    )
  }

  ngAfterViewInit(): void {
  }

  accentColor!: string;
  primaryColor!: string;
  iconColor!: string;
  volumeValue = new FormControl<number>(50);
  playbackValue = new FormControl<number>(0);

  //TODO add mute feature (e.g. fix current function) and change icon based on volume status

  repeatState: repeatStateEnum = repeatStateEnum.disabled;
  repeatHover: boolean = false;

  //playback slider params
  disabled = false;
  max = 250;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  //volyme slider params
  volMax = 100;
  volMin = 0;
  volStep = 1;
  volMuted: boolean = false;
  volStoredValue: number = 0;

  setRepeat() {
    this.repeatState == repeatStateEnum.once ?
      this.repeatState = repeatStateEnum.disabled :
      this.repeatState++;
  }

  setRepeatColor(): string | undefined {
    switch (this.repeatState) {
      case repeatStateEnum.enabled:
        return 'rgb(' + this.accentColor! + ')';
      case repeatStateEnum.once:
        return 'rgb(' + this.accentColor! + ')';
      default:
        return this.iconColor!;
    }
  }

  mute() {
    if (this.volumeValue.value == 0 && this.volStoredValue == 0) {
      this.volumeValue.setValue(50);
      return;
    }

    if (!this.volMuted) {
      this.volMuted = true;
      this.volStoredValue = this.volumeValue.value!;
      this.volumeValue.setValue(0);
    } else {
      this.volMuted = false;
      this.volumeValue.setValue(this.volStoredValue);
    }
  }

  async play() {
    await this.playbackService.getUserPlaylists();
  }
}

enum repeatStateEnum {
  disabled,
  enabled,
  once
}