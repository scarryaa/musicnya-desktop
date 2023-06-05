/**
 * Interface for the 'Music Entity' data
 */
export interface MusicAPIEntity {
  id: string | number; // Primary ID
  name: string;
  payload: any;
}

export interface Ratings {
  id: string;
  rating: number;
}
