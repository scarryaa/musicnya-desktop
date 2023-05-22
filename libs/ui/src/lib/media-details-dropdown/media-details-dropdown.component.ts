import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-media-details-dropdown',
  template: `
    <div id="more-info-content" [style.maxHeight.px]="showContent ? height : 0">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./media-details-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDetailsDropdownComponent implements AfterContentChecked {
  @ContentChild('content') content!: ElementRef;
  @Input() showContent = false;
  showAdditionalInfo = false;
  height = 0;

  constructor(private changeDetectorReference: ChangeDetectorRef) {}

  ngAfterContentChecked() {
    this.height = (this.content.nativeElement as HTMLElement).scrollHeight;
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [MediaDetailsDropdownComponent],
  declarations: [MediaDetailsDropdownComponent],
})
export class MediaDetailsDropdownModule {}
