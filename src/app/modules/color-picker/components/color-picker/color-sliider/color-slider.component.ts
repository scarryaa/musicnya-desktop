import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-color-slider',
  templateUrl: './color-slider.component.html',
  styleUrls: ['./color-slider.component.scss']
})
export class ColorSliderComponent implements AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @HostListener('window:mouseup', ['$event']) onMouseUp(event: MouseEvent) { this.mousedown = false; }
  @Output() color: EventEmitter<string> = new EventEmitter()
  private mousedown: boolean = false;
  private selectedHeight!: number;
  private ctx!: CanvasRenderingContext2D;

  ngAfterViewInit(): void {
    this.draw();  
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true })!;
    }

    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;
    this.ctx.clearRect(0, 0, width, height);

    const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgb(255, 0, 0)');
    gradient.addColorStop(0.17, 'rgb(255, 255, 0)');
    gradient.addColorStop(0.34, 'rgb(0, 255, 0)');
    gradient.addColorStop(0.51, 'rgb(0, 255, 255)');
    gradient.addColorStop(0.68, 'rgb(0, 0, 255)');
    gradient.addColorStop(0.85, 'rgb(255, 0, 255)');
    gradient.addColorStop(1, 'rgb(255, 0, 0)');

    this.ctx.beginPath();
    this.ctx.roundRect(0, 0, width, height, 8);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    if (this.selectedHeight) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'white';
      this.ctx.lineWidth = 2;
      this.ctx.arc(width / 2, this.selectedHeight, 6, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }

  onMouseDown(event: MouseEvent) {
    this.mousedown = true;
    this.selectedHeight = event.offsetY;
    this.draw();
    this.emitColor(event.offsetX, event.offsetY);
  }

  onMouseMove(event: MouseEvent) {
    if (this.mousedown) {
      this.selectedHeight = Math.min(Math.max(event.offsetY, 6), this.canvas.nativeElement.height - 6);
      this.draw();
      this.emitColor(event.offsetX, Math.min(Math.max(event.offsetY, 6), this.canvas.nativeElement.height - 6));
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, 1)`;
  }
}
