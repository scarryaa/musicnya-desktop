import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.scss']
})
export class ColorPaletteComponent implements AfterViewInit, OnChanges {
  @Input() hue!: string;
  @Output() color: EventEmitter<string> = new EventEmitter(true);
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @HostListener('window:mouseup', ['$event']) onMouseUp(event: MouseEvent) { this.mousedown = false };
  private ctx!: CanvasRenderingContext2D;
  private mousedown: boolean = false;
  public selectedPosition!: { x: number, y: number };
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hue'] && this.ctx) {
      this.draw();
      const pos = this.selectedPosition;
      if (pos) {
        this.color.emit(this.getColorAtPosition(pos.x, pos.y));
      }
    }
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  draw() {
    if (!this.ctx) {
      this.ctx = this.canvas.nativeElement.getContext('2d', { willReadFrequently: true })!;
    }

    const width = this.canvas.nativeElement.width;
    const height = this.canvas.nativeElement.height;

    this.ctx.fillStyle = this.hue || 'rgba(255, 255, 255, 1)';
    this.ctx.fillRect(0, 0, width, height);

    const whiteGradient = this.ctx.createLinearGradient(0, 0, width, 0);
    whiteGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    whiteGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    this.ctx.fillStyle = whiteGradient;
    this.ctx.fillRect(0, 0, width, height);

    const blackGradient = this.ctx.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    blackGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

    this.ctx.fillStyle = blackGradient;
    this.ctx.fillRect(0, 0, width, height);

    if (this.selectedPosition) {
      this.ctx.strokeStyle = 'white';
      this.ctx.fillStyle = 'white';
      this.ctx.beginPath();
      this.ctx.arc(this.selectedPosition.x, this.selectedPosition.y, 10, 0, 2 * Math.PI);
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    }
  }

  onMouseDown(event: MouseEvent) {
    this.mousedown = true;
    this.selectedPosition = { x: event.offsetX, y: event.offsetY };
    this.draw();

    this.color.emit(this.getColorAtPosition(event.offsetX, event.offsetY));
  }

  onMouseMove(event: MouseEvent) {
    if (this.mousedown) {
      this.selectedPosition = { x: event.offsetX, y: event.offsetY };
      this.draw();
      this.emitColor(event.offsetX, event.offsetY);
    }
  }

  emitColor(x: number, y: number) {
    const rgbaColor = this.getColorAtPosition(x, y);
    this.color.emit(rgbaColor);
  }

  getColorAtPosition(x: number, y: number) {
    const imageData = this.ctx.getImageData(x, y, 1, 1).data;
    return `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
  }

}
