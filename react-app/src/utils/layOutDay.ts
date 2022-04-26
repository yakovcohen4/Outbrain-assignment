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

export const layOutDay = (events: EventInterface[] = []) => {
  // no events - return empty array
  if (events.length === 0) {
    return [];
  }

  // get events with all their collisions
  events = getEventsWithAllTheirCollisions(events);

  // Events are sort by start time, the first event is the earliest event.
  let sortedEvents = [...events].sort((a, b) => {
    return a.start - b.start;
  });

  const DEFAULT_LEFT = 0;
  const DEFAULT_WIDTH = 600;
  // Calculate width and left position for event based on collision counts.
  while (sortedEvents.length > 0) {
    // Take the first event
    const event = sortedEvents.shift();
    if (event === undefined) break;

    // no collisions - width is 600 and left is 0
    if (!event.collisions || !event.collisions.length) {
      event.left = DEFAULT_LEFT;
      event.width = DEFAULT_WIDTH;
      continue;
    }

    const eventCollisions = event.collisions;
    const eventFirstCollision = eventCollisions[0];
    const eventCollisionsLength = eventCollisions?.length;

    let left = DEFAULT_LEFT;
    let width = getWidthByCollisions(
      DEFAULT_WIDTH,
      eventCollisionsLength,
      eventFirstCollision
    );

    // if there is no left and width, set left and width
    event.left = event.left || left;
    event.width = event.width || width;

    const definedEventCollisions = eventCollisions.filter(
      event => event.left !== undefined
    );

    // Running on all collisions and setting a location for each colliding event
    for (let index = 1; index <= eventCollisionsLength; index++) {
      // Take event from the event collision
      const eventCollision = eventCollisions[index - 1];

      // if there is no left to event Collision, set left
      if (!eventCollision.left) {
        if (definedEventCollisions.length > 0) {
          // there are defined events - set left by event position
          left = getLeftByEventPosition(DEFAULT_WIDTH, event.left, event.width);
        } else {
          // if not - set left by width * index of event collision
          left = width * index;
        }
        eventCollision.left = left;
      }

      // if there is no width, set width
      if (!eventCollision.width) {
        if (definedEventCollisions.length > 0) {
          // there are defined events - set width by event collision and event position
          width =
            eventCollision.left + event.width >= DEFAULT_WIDTH
              ? DEFAULT_WIDTH - width / definedEventCollisions.length
              : width;
        }
        eventCollision.width = width;
      }

      // Remove event from sortedEvents
      sortedEvents = removeEventById(sortedEvents, eventCollision.id);
    }
  }
  return events;
};

/**
 * Remove an event from an array of events by id.
 * @param  {EventInterface[]} events
 * @param  {Number} id
 * @return {EventInterface[]}
 */
function removeEventById(events: EventInterface[], id: number) {
  return events.filter(event => event.id !== id);
}

/**
 * Checks to see if two events collide.
 * @param  {EventInterface} event1
 * @param  {EventInterface} event2
 * @return {Boolean}
 */
export function eventsCollide(event1: EventInterface, event2: EventInterface) {
  const secondEventStartsWithinFirstEvent =
    event1.start <= event2.start && event1.end >= event2.start;
  const secondEventEndWithinFirstEvent =
    event1.start <= event2.end && event1.end >= event2.end;

  return secondEventStartsWithinFirstEvent || secondEventEndWithinFirstEvent;
}

/**
 * The function receives an array of events,
 * and returns the array of events with each event and its collisions.
 * @param  {EventInterface[]} events
 * @return {EventInterface[]}
 **/
//  eventsWithAllTheirCollisions
export const getEventsWithAllTheirCollisions = (events: EventInterface[]) => {
  events.map(event => {
    const eventCollisions = events.filter(
      otherEvent =>
        event.id !== otherEvent.id && eventsCollide(event, otherEvent)
    );
    event.collisions = eventCollisions || [];
  });
  return events;
};

/**
 * The function calculates the left position.
 * event left + event width is greater than the default width?,
 *      YES: the left position is 0
 *      NO: the left position is the event left + event width
 *
 * @param  {number} DEFAULT_WIDTH
 * @param  {number} eventLeft
 * @param  {number} eventWidth
 * @return {number}
 **/
export const getLeftByEventPosition = (
  DEFAULT_WIDTH: number,
  eventLeft: number,
  eventWidth: number
): number => {
  return eventLeft + eventWidth >= DEFAULT_WIDTH ? 0 : eventLeft + eventWidth;
};

/**
 * The function calculates the width of an event based on the number of collisions.
 * first events collisions have width?
 *      YES: the width - 600 minus (the width of the first collision)
 *      NO: the width - 600 divided (the number of collisions + 1)
 *
 * @param  {number} DEFAULT_WIDTH
 * @param  {number} eventCollisionsLength
 * @param  {EventInterface} eventFirstCollision?
 * @return {number}
 **/
export const getWidthByCollisions = (
  DEFAULT_WIDTH: number,
  eventCollisionsLength: number,
  eventFirstCollision?: EventInterface
): number => {
  return eventFirstCollision?.width
    ? DEFAULT_WIDTH - eventFirstCollision?.width
    : DEFAULT_WIDTH / (eventCollisionsLength + 1);
};
