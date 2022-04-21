import { eventsCollide } from '../utils/layOutDay';

import { eventsTest } from './eventsDataTest';

describe('test for eventsCollide function', () => {
  // collide
  it('should return true - events(0,3) collide', () => {
    expect(eventsCollide(eventsTest[0], eventsTest[2])).toBe(true);
  });
  it('should return true - events(7,8) collide', () => {
    expect(eventsCollide(eventsTest[6], eventsTest[7])).toBe(true);
  });

  // not collide
  it('should return false - events(2,9) do not collide', () => {
    expect(eventsCollide(eventsTest[1], eventsTest[8])).toBe(false);
  });
  it('should return false - events(3,7) do not collide', () => {
    expect(eventsCollide(eventsTest[3], eventsTest[7])).toBe(false);
  });
});
