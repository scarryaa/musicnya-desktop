import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { MatToolbar } from '@angular/material/toolbar';
import { environment } from 'src/environments/environment';
import { UIService } from '../../services/ui/ui.service';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('header') headerElem!: MatToolbar;
  @ViewChild('playlistControls') playlistControls!: any;

  compact: boolean = this.uiService.drawerCollapsed;
  headerOpacity: number = 0;
  firstPage: boolean = true;
  backButton: boolean = false;
  headerTitle: string = '';
  enableWindowControls: boolean = true;
  headerHeight: number = 45;

  ngOnInit(): void {
    this.enableWindowControls = environment.enableWindowControls;
  }

  //TODO implement back navigation within library filters page
  constructor(public themeService: ThemeService, private renderer: Renderer2,
    private ref: ChangeDetectorRef, public uiService: UIService, public navigationService: NavigationService) {
    this.uiService.drawerCollapsed$.subscribe((value: boolean) => this.compact = value);
  }

  toggleSideNav() {
    this.uiService.toggleDrawer();
  }

  ngAfterViewInit(): void {
    this.uiService.headerTitle$.subscribe((title: string) => {
      this.headerTitle = title;
      this.ref.detectChanges();
    });

    this.uiService.headerOpacity$.subscribe((opacity: number) => {
      this.renderer.setStyle(this.headerElem._elementRef.nativeElement,
        'backgroundColor', `rgba(${this.themeService.headerColor}, ${opacity}`);
        this.headerOpacity = opacity;
      this.ref.detectChanges();
    });
  }

  @Input() searchInput: string = '';
}