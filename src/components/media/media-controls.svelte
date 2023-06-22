<script>
  import SkipPrevious from "svelte-material-icons/SkipPrevious.svelte";
  import PauseCircle from "svelte-material-icons/PauseCircle.svelte";
  import PlayCircle from "svelte-material-icons/PlayCircle.svelte";
  import SkipNext from "svelte-material-icons/SkipNext.svelte";
  import Shuffle from "svelte-material-icons/Shuffle.svelte";
  import VolumeHigh from "svelte-material-icons/VolumeHigh.svelte";
  import FormatQuoteClose from "svelte-material-icons/FormatQuoteClose.svelte";
  import Repeat from "svelte-material-icons/Repeat.svelte";
  import ViewList from "svelte-material-icons/ViewList.svelte";

  import Slider from "./slider.svelte";
  import DrawerButton from "../drawer/drawer-button.svelte";
</script>

<div class="media-controls">
  <div style="display: flex; flex-grow: 1; margin-left: 4rem;">
    <div class="playback-buttons">
      <div class="repeat-shuffle-wrapper">
        <DrawerButton>
          <Shuffle />
        </DrawerButton>
        <DrawerButton>
          <svelte:component this="{Repeat}" />
        </DrawerButton>
      </div>
      <DrawerButton>
        <SkipPrevious />
      </DrawerButton>
      <div class="play-pause-wrapper">
        <DrawerButton>
          <PauseCircle />
        </DrawerButton>
      </div>
      <DrawerButton>
        <SkipNext />
      </DrawerButton>
    </div>
    <div class="playback-slider-wrapper">
      <p class="playback-time">0:00</p>
      <Slider />
      <p class="playback-time" id="total-playback-time">0:00</p>
    </div>
  </div>
  <div class="misc-buttons">
    <DrawerButton>
      <ViewList />
    </DrawerButton>
    <DrawerButton>
      <FormatQuoteClose />
    </DrawerButton>
    <DrawerButton>
      <svelte:component this="{VolumeHigh}" />
    </DrawerButton>
    <div class="volume-slider-wrapper">
      <Slider />
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
