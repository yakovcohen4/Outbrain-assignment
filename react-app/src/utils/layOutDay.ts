import { EventInterface } from '../@types';

/**
 * Lays out events for a single  day
 *
 * @param {Array} events An array of event objects.
 *                       Each event object has a unique id,
 *                       consisting of a start and end time (measured in minutes) from 9 am.
 *                       The start and end times of each event will be [0, 720].
 *                       The start time will be less than the end time.
 *
 * @return {Array} An array of event objects that has a unique id, start and end time,
 *                 and the  width and the left positions set.
 *                 The object should be laid out so that there are no overlapping events.
 *                 - Events should use the maximum width possible without overlapping.
 *                 - Every colliding event should be the same width as every other event
 *                   that it collides with, while still adhering to the first constraint.
 *
 * function layOutDay(events) {...}
 **/

export const layOutDay = (events: EventInterface[]) => {
  // no events - return empty array
  if (!events || events.length === 0) return [];

/**
 * Checks to see if two events collide.
 * @param  {EventInterface} event1
 * @param  {EventInterface} event2
 * @return {Boolean}
 */
function eventsCollide(event1: EventInterface, event2: EventInterface) {
  // event2 starts within event1
  if (event1.start <= event2.start && event1.end >= event2.start) {
    return true;
  }

  // event2 ends within event1
  if (event1.start <= event2.end && event1.end >= event2.end) {
    return true;
  }

  return false;
}
