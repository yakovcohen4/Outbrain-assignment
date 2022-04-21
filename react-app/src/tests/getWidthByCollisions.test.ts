import { getWidthByCollisions } from '../utils/layOutDay';
import { eventsTest } from './eventsDataTest';
import { eventsTestWithFakeCollisions } from './eventsDataTest';

const DEFAULT_WIDTH: number = 600;

describe('test for getWidthByCollisions function', () => {
  it('should return the width position of event 1 - 200', () => {
    const width = getWidthByCollisions(
      DEFAULT_WIDTH,
      eventsTestWithFakeCollisions[0].collisions.length,
      eventsTest[0]
    );
    expect(width).toBe(200);
  });

  it('should return the width position of event 2 - 200', () => {
    const width = getWidthByCollisions(
      DEFAULT_WIDTH,
      eventsTestWithFakeCollisions[1].collisions.length,
      eventsTest[1]
    );
    expect(width).toBe(200);
  });
});
