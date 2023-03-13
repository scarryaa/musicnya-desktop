import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Directive, OnInit, OnDestroy, Self, Inject } from "@angular/core";
import { Subject, fromEvent, debounceTime, takeUntil } from "rxjs";

@Directive({
	selector: 'cdk-virtual-scroll-viewport',
	
})
export class CdkVirtualScrollViewportPatchDirective implements OnInit, OnDestroy {
	protected readonly destroy$ = new Subject();

	constructor(
		@Self() @Inject(CdkVirtualScrollViewport) private readonly viewportComponent: CdkVirtualScrollViewport,
	) {}

	ngOnInit() {
		fromEvent(window, 'resize')
			.pipe(
				debounceTime(10),
				takeUntil(this.destroy$),
			)
			.subscribe(() => this.viewportComponent.checkViewportSize());
	}

	ngOnDestroy() {
		this.destroy$.complete();
	}
}