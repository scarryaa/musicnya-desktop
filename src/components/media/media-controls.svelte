<script lang="ts">
	import SkipPrevious from 'svelte-material-icons/SkipPrevious.svelte';
	import PauseCircle from 'svelte-material-icons/PauseCircle.svelte';
	import PlayCircle from 'svelte-material-icons/PlayCircle.svelte';
	import SkipNext from 'svelte-material-icons/SkipNext.svelte';
	import Shuffle from 'svelte-material-icons/Shuffle.svelte';
	import VolumeHigh from 'svelte-material-icons/VolumeHigh.svelte';
	import VolumeMedium from 'svelte-material-icons/VolumeMedium.svelte';
	import VolumeMute from 'svelte-material-icons/VolumeMute.svelte';
	import FormatQuoteClose from 'svelte-material-icons/FormatQuoteClose.svelte';
	import Repeat from 'svelte-material-icons/Repeat.svelte';
	import RepeatOnce from 'svelte-material-icons/RepeatOnce.svelte';
	import ViewList from 'svelte-material-icons/ViewList.svelte';

	import DrawerButton from '../drawer/drawer-button.svelte';
	import {
		seekToTime,
		setVolume,
		skipToNextItem,
		skipToPreviousItem,
		togglePlayPause,
		toggleRepeatMode,
		toggleShuffleMode
	} from '../../lib/api/music.api';
	import Slider from './slider.svelte';
	import {
		nowPlayingItemDuration,
		nowPlayingItemTime,
		playing,
		repeatMode,
		shuffleMode
	} from '../../stores/musickit.store';
	import { onMount } from 'svelte';

	let currentTime = '';
	$: currentTime = new Date($nowPlayingItemTime * 1000).toISOString().substr(14, 5);

	let duration = '';
	$: duration = new Date($nowPlayingItemDuration * 1000).toISOString().substr(14, 5);
	export let volumeValue: number = 0.2;
	export let onLyricsClick: () => void;
	export let onQueueClick: () => void;

	let progress = 0;
	$: progress = ($nowPlayingItemTime / $nowPlayingItemDuration) * $nowPlayingItemDuration;
	let volumeValueOld = 0;

	const _setVolume = (value: number) => {
		volumeValueOld = volumeValue;
		setVolume(value);
		volumeValue = value;
	};

	onMount(() => {
		setVolume(volumeValue);
	});
</script>

<div class="media-controls">
	<div style="display: flex; flex-grow: 1; margin-left: 4rem;">
		<div class="playback-buttons">
			<div class="repeat-shuffle-wrapper">
				<DrawerButton on:click={() => toggleShuffleMode()} title={$playing ? 'Pause' : 'Play'}>
					<svelte:component
						this={$shuffleMode ? Shuffle : Shuffle}
						color={$shuffleMode ? 'red' : 'var(--text)'}
					/>
				</DrawerButton>
				<DrawerButton
					on:click={() => toggleRepeatMode()}
					title={$repeatMode === 1 ? 'Repeat All' : $repeatMode === 2 ? 'Repeat Off' : 'Repeat One'}
				>
					<svelte:component
						this={$repeatMode === 1 ? RepeatOnce : $repeatMode === 2 ? Repeat : Repeat}
						color={$repeatMode ? 'red' : 'var(--text)'}
					/>
				</DrawerButton>
			</div>
			<DrawerButton on:click={() => skipToPreviousItem()} title="Previous">
				<SkipPrevious />
			</DrawerButton>
			<div class="play-pause-wrapper" title={$playing ? 'Pause' : 'Play'}>
				<DrawerButton on:click={() => togglePlayPause()}>
					<svelte:component this={$playing ? PauseCircle : PlayCircle} />
				</DrawerButton>
			</div>
			<DrawerButton on:click={() => skipToNextItem()} title="Next">
				<SkipNext />
			</DrawerButton>
		</div>
		<div class="playback-slider-wrapper">
			<p class="playback-time">{currentTime}</p>
			<Slider
				bind:value={progress}
				min={0}
				max={$nowPlayingItemDuration}
				on:change={(e) => seekToTime(e.target?.value)}
			/>
			<p class="playback-time" id="total-playback-time">{duration}</p>
		</div>
	</div>
	<div class="misc-buttons">
		<DrawerButton title="Queue" on:click={onQueueClick}>
			<ViewList />
		</DrawerButton>
		<DrawerButton title="Lyrics" on:click={onLyricsClick}>
			<FormatQuoteClose />
		</DrawerButton>
		<DrawerButton
			on:click={() =>
				_setVolume(volumeValue === 0 ? (volumeValueOld === 0 ? 0.2 : volumeValueOld) : 0)}
			title={volumeValue === 0 ? 'Unmute' : 'Mute'}
		>
			<svelte:component
				this={volumeValue === 0 ? VolumeMute : volumeValue <= 0.5 ? VolumeMedium : VolumeHigh}
			/>
		</DrawerButton>
		<div class="volume-slider-wrapper">
			<Slider
				step={0.01}
				bind:value={volumeValue}
				min={0}
				max={1}
				on:input={(e) => setVolume(e.target.value || 0)}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.media-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 0.8rem;
		flex-grow: 1;
		place-content: space-between;

		.repeat-shuffle-wrapper {
			display: flex;
			align-items: center;
			margin-top: 0.65rem;
			margin-right: 0.5rem;

			:global(*) {
				font-size: 1.3rem;
			}
		}

		.play-pause-wrapper {
			:global(*) {
				font-size: 2.8rem;
			}
			margin-right: 0.2em;
		}

		.playback-buttons {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.playback-slider-wrapper {
			margin-left: 1rem;
			margin-right: 3rem;
			display: flex;
			align-items: center;
			gap: 0.4rem;
			margin-top: -0.5rem;
			width: 100%;
			min-width: 10rem;
			max-width: 50vw;

			:global(.slider) {
				width: 100%;
			}

			:global(input) {
				width: 100%;
				min-width: 10rem;
				max-width: 50vw;
			}

			.playback-time {
				margin-top: 1.1rem;
				font-size: 0.85rem;
				color: var(--text);
			}

			#total-playback-time {
				margin-left: 0.4rem;
			}
		}

		.misc-buttons {
			:global(*) {
				font-size: 1.5rem;
				margin-inline: -0.1rem;
			}

			margin-top: 0.2rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 1rem;

			.volume-slider-wrapper {
				margin-left: 0.2rem;
				margin-top: -1.15rem;

				:global(input) {
					width: 100%;
					max-width: 5rem;
				}
			}
		}
	}
</style>
