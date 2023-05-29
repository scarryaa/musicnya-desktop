import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overlay">
      <div class="spinner">
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 99999;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .spinner {
        position: relative;
        width: 100px;
        height: 100px;
        animation: spin 2s infinite linear;
      }

      .ray {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        animation: spin 2s infinite linear;
        transform-origin: center center;
      }

      .ray:before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 2px;
        height: 20px;
        background: #fff;
        border-radius: 2px;
        transform: translate(-50%, -50%);
      }

      .ray:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: 0.25s;
      }

      .ray:nth-child(1):before {
        animation-delay: 0.25s;
      }

      .ray:nth-child(2) {
        transform: rotate(45deg);
        animation-delay: 0.5s;
      }

      .ray:nth-child(2):before {
        animation-delay: 0.5s;
      }

      .ray:nth-child(3) {
        transform: rotate(90deg);
        animation-delay: 0.75s;
      }

      .ray:nth-child(3):before {
        animation-delay: 0.75s;
      }

      .ray:nth-child(4) {
        transform: rotate(135deg);
        animation-delay: 1s;
      }

      .ray:nth-child(4):before {
        animation-delay: 1s;
      }

      .ray:nth-child(5) {
        transform: rotate(180deg);
        animation-delay: 1.25s;
      }

      .ray:nth-child(5):before {
        animation-delay: 1.25s;
      }

      .ray:nth-child(6) {
        transform: rotate(225deg);
        animation-delay: 1.5s;
      }

      .ray:nth-child(6):before {
        animation-delay: 1.5s;
      }

      .ray:nth-child(7) {
        transform: rotate(270deg);
        animation-delay: 1.75s;
      }

      .ray:nth-child(7):before {
        animation-delay: 1.75s;
      }

      .ray:nth-child(8) {
        transform: rotate(315deg);
        animation-delay: 2s;
      }

      .ray:nth-child(8):before {
        animation-delay: 2s;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
