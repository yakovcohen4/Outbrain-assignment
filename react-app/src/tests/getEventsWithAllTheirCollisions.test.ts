import { getEventsWithAllTheirCollisions } from '../utils/layOutDay';
import { eventsTest } from './eventsDataTest';
import { eventsTestWithFakeCollisions } from './eventsDataTest';

describe('test for getEventsWithAllTheirCollisions function', () => {
  it('should return events with all their collisions', () => {
    const events = getEventsWithAllTheirCollisions(eventsTest);

    for (let index = 0; index < events.length; index++) {
      expect(events[index].collisions!.length).toBe(
        eventsTestWithFakeCollisions[index].collisions!.length
      );
    }
  });
});
