//TODO fix this import
export type Descriptor = string;

export class QueueOptions {
  album?: string;
  items?: Array<Descriptor>;
  playlist?: string;
  song?: string;
  songs?: Array<string>;
  station?: string;
  startPlaying?: boolean;
  startPosition?: number;
  url?: string;
}

export interface IMediaPlayInfo {
  type: MediaType;
  id: string;
  childIds?: string[];
  artistIds: string[];
}

type MediaType = keyof QueueOptions;

export type MediaPlayInfo = IMediaPlayInfo;
