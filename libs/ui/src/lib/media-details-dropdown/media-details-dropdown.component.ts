import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-media-details-dropdown',
  template: `
    <div
      id="more-info-content"
      [style.opacity]="showContent ? 1 : 0"
      [style.maxHeight.px]="showContent ? height : 0"
    >
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./media-details-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDetailsDropdownComponent
  implements AfterContentChecked, AfterViewInit
{
  @ContentChild('content') content!: ElementRef;
  @Input() showContent = false;
  showAdditionalInfo = false;
  height = 0;

  constructor(private changeDetectorReference: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    //TODO fix bug where this shows for a split second initially
    this.changeDetectorReference.detectChanges();
  }

  ngAfterContentChecked() {
    this.height = (this.content.nativeElement as HTMLElement).scrollHeight;
    this.changeDetectorReference.detectChanges();
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [MediaDetailsDropdownComponent],
  declarations: [MediaDetailsDropdownComponent],
})
export class MediaDetailsDropdownModule {}
