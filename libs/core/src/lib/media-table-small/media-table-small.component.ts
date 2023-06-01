import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { Songs } from '../models/music.types';
import { SongDataSource } from '../models/song-data-source';
import { AlbumTileModule } from '../album-tile/album-tile.component';

@Component({
  selector: 'core-media-table-small',
  standalone: true,
  imports: [CommonModule, CdkTableModule, AlbumTileModule],
  template: `<table cdk-table [dataSource]="dataSource">
    <ng-container cdkColumnDef="albums">
      <th cdk-header-cell *cdkHeaderCellDef></th>
      <td cdk-cell *cdkCellDef="let media"></td>
    </ng-container>

    <ng-container cdkColumnDef="album">
      <th id="id-table-header" cdk-header-cell *cdkHeaderCellDef></th>
      <td cdk-cell *cdkCellDef="let media" class="content">
        <ui-album-tile
          [artists]="media.attributes?.albumName"
          [showArtists]="true"
          [mediaTitle]="media.attributes?.name"
          [source]="media.attributes?.artwork?.url"
          [sizeX]="2.5"
          [showArt]="true"
          [titleRouterLink]="
        '/media/albums/' + media.relationships?.albums?.data?.[0]?.id"
          [artistsRouterLink]="'/media/artists/' + (media.relationships?.artists?.data?.[0]?.id ||  media.relationships?.catalog?.data?.[0]?.relationships?.artists?.data?.[0]?.id)"
          [ngClass]="{
            'artist-hover': true,
            'title-hover': true,
            'accent-color': playingSong === '1',
            'font-color': playingSong !== '1'
          }"
        ></ui-album-tile>
      </td>
    </ng-container>

    <tr cdk-header-row *cdkHeaderRowDef="['albums', 'album']"></tr>
    <tr
      cdk-row
      #mediaItem
      *cdkRowDef="let row; let i = index; columns: ['albums', 'album']"
    ></tr>
  </table>`,
  styleUrls: ['./media-table-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaTableSmallComponent implements OnChanges {
  @Input() songs: Songs[] = [];
  @Input() playingSong: string | undefined = undefined;
  @Input() rows = 3;
  @Input() index = 0;
  dataSource!: DataSource<Songs>;

  constructor() {
    this.dataSource = new SongDataSource(this.songs);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['songs']) {
      this.dataSource = new SongDataSource(
        changes['songs'].currentValue.slice(this.index, this.index + this.rows)
      );
    }
  }
}
