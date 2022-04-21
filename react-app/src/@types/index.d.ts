export interface EventInterface {
  id: number;
  start: number;
  end: number;
  title?: string;
  location?: string;
  left?: number;
  width?: number;
  collisions?: EventInterface[];
}
