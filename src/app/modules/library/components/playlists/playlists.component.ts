import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { LibraryViewHandlerService } from 'src/app/services/library-view-handler/library-view-handler.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  @ViewChild('playlistsTemplate') playlistsTemplate!: TemplateRef<any>;
  @ViewChild('podcastsTemplate') podcastsTemplate!: TemplateRef<any>;
  @ViewChild('audiobooksTemplate') audiobooksTemplate!: TemplateRef<any>;
  @ViewChild('artistsTemplate') artistsTemplate!: TemplateRef<any>;
  @ViewChild('albumsTemplate') albumsTemplate!: TemplateRef<any>;
  @ViewChild('defaultTemplate') defaultTemplate!: TemplateRef<any>;
  
  constructor(private libraryViewService: LibraryViewHandlerService) {}

  currentView : TemplateRef<any> = this.defaultTemplate!;
  
  ngOnInit(): void {
    this.libraryViewService.getRefresh().subscribe((value: string) => {
      switch (value) {
        case 'playlists':
          this.currentView = this.playlistsTemplate;
          break;
        case 'podcasts':
          this.currentView = this.podcastsTemplate;
          break;
        case 'audiobooks':
          this.currentView = this.audiobooksTemplate;
          break;
        case 'artists':
          this.currentView = this.artistsTemplate;
          break;
        case 'albums':
          this.currentView = this.albumsTemplate;
          break;
      }
  })
  }
}
