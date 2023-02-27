import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements AfterViewInit {
  constructor(private ref: ChangeDetectorRef) {}

  fontStyle: string = 'f3';
  marginBottomStyle: string = 'mb1';
  @Input('text') text!: string;
  @Input('icon') icon!: string;
  @Input('fontSize') fontSize?: string;
  @Input('showIcon') showIcon?: boolean;
  @Input('marginBottom') marginBottom?: string;

  public ngAfterViewInit(): void {
    if (this.fontSize) {
      this.fontStyle = this.fontSize;
    }

    if (this.marginBottom) {
      this.marginBottomStyle = this.marginBottom;
    }
    this.ref.detectChanges();
  }
}
