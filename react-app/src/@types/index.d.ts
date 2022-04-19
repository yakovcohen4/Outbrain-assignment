export interface EventInterface {
  id: number;
  start: number;
  end: number;
  left?: number;
  width?: number;
  collisions?: EventInterface[];
}
