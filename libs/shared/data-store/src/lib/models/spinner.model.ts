// spinner model

export interface SpinnerEntity {
  show: boolean;
  message: string;
  ids: string[];
  entities: { [id: string]: SpinnerEntity };
}
