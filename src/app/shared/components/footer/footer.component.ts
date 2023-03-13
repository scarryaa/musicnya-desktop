import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSliderDragEvent } from '@angular/material/slider';
import { MusickitStore } from "ngx-apple-music";
import { Subscription } from 'rxjs';
import { ThemeStore } from 'src/app/store/theme-store';
import { UIStore } from 'src/app/store/ui-store';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {

  tooltip: string;

  //playback slider params
  disabled = false;
  max = 0;
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
  subs: Subscription;
  dragging: boolean = false;

  constructor(public musicKitStore: MusickitStore, public uiStore: UIStore, public themeStore: ThemeStore) {
    this.tooltip = "Enable Repeat";
    this.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    this.iconColor = getComputedStyle(document.documentElement).getPropertyValue('--ui-color-override');
    this.subs = new Subscription();
  }

  playerRepeat = MusicKit.PlayerRepeatMode;
  playerState = MusicKit.PlaybackStates;

  ngOnInit(): void {
    this.primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    this.accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
    this.iconColor = getComputedStyle(document.documentElement).getPropertyValue('--ui-color-override');
    this.subs.add(this.volumeValue.valueChanges.subscribe((value) => {
      // we know the user manually did this, because it 
      // would be muted already if the mute btn was pressed
      if (value == 0 && !this.volMuted) {
        this.volStoredValue = 0;
        this.volMuted = true;
        this.musicKitStore.setVolume(value!);
      }
      else if (value != 0 && this.volMuted) {
        this.volMuted = false;
        this.musicKitStore.setVolume(value! / 100);
      }
    }));

    this.subs.add(this.volumeValue.valueChanges.subscribe((volume: number | null) =>
      this.musicKitStore.setVolume(volume! / 100)));

    this.subs.add(this.musicKitStore.state$.subscribe((state: any) => {
      if(!this.dragging || this.playbackValue.value! === this.musicKitStore?.state.currentPlaybackTime) return this.playbackValue.setValue(state?.currentPlaybackTime)
    }
    ));

    this.subs.add(this.musicKitStore.state$.subscribe((state: any) =>
      this.max = state?.currentPlaybackDuration
    ));

    this.subs.add(this.musicKitStore.state$.subscribe((state: any) => this.tooltip =
    (state?.repeatMode === MusicKit.PlayerRepeatMode.none) ? 'Enable Repeat' : 
                    (state?.repeatMode === MusicKit.PlayerRepeatMode.all) ? 'Enable Repeat Once' : 'Disable Repeat'
    ));

    this.musicKitStore.setVolume(this.volumeValue.value! / 100);
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  accentColor!: string;
  primaryColor!: string;
  iconColor!: string;
  volumeValue = new FormControl<number>(10);
  playbackValue = new FormControl<number>(0);

  handleDragStart() {
    if (!this.musicKitStore?.state.currentTrack) return;
    this.dragging = true;
  }

  async handleDragEnd(event: MatSliderDragEvent) {
    if (!this.musicKitStore.state.currentTrack) return;
    this.playbackValue.setValue(event.value);
    await this.musicKitStore.seekToTime(event.value);
    this.dragging = false;
  }

  toggleShuffleMode() {
    this.musicKitStore.toggleShuffleMode();
    var mode = this.musicKitStore?.state.shuffleMode as MusicKit.PlayerShuffleMode;
    this.uiStore.toggleShuffleIcon(mode);
    this.themeStore.toggleShuffleColor(mode);
  }

  toggleRepeatMode() {
    this.musicKitStore.toggleRepeatMode();
    var mode = this.musicKitStore?.state.repeatMode as MusicKit.PlayerRepeatMode;
    this.uiStore.toggleRepeatIcon(mode);
    this.themeStore.toggleRepeatColor(mode);
  }

  mute() {
    if (this.volumeValue.value == 0 && this.volStoredValue == 0) {
      this.volumeValue.setValue(50);
      this.musicKitStore.setVolume(this.volumeValue.value / 100);
      return;
    }

    if (!this.volMuted) {
      this.volMuted = true;
      this.volStoredValue = this.volumeValue.value!;
      this.volumeValue.setValue(0);
      this.musicKitStore.setVolume(this.volumeValue.value!);
    } else {
      this.volMuted = false;
      this.volumeValue.setValue(this.volStoredValue);
      this.musicKitStore.setVolume(this.volStoredValue / 100);
    }
  }

  async playPause() {
    await this.musicKitStore.togglePlayback();
  }
}