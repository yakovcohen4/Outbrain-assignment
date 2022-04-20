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

  // get events with all their collisions
  getEventsWithAllTheirCollisions(events);

  // Events are sort by start time, the first event is the earliest event.
  let sortedEvents = [...events].sort((a, b) => {
    return a.start - b.start;
  });

  // Calculate width and left position for event based on collision counts.
  while (sortedEvents.length > 0) {
    // Take the first event
    const event = sortedEvents.shift();
    if (event === undefined) break;

    // no collisions - width is 600 and left is 0
    if (!event.collisions || !event.collisions.length) {
      event.left = 0;
      event.width = 600;
      break;
    }

    const eventsCollisions = event.collisions;
    const eventsCollisionsFirst = eventsCollisions[0] as EventInterface;
    const eventsCollisionsLength = eventsCollisions?.length;

    let left = 0;
    // first events collisions have width?
    // YES: the width - 600 minus (the width of the first collision)
    // NO: the width - 600 divided (the number of collisions + 1)
    let width = eventsCollisionsFirst?.width
      ? 600 - eventsCollisionsFirst?.width
      : 600 / (eventsCollisionsLength + 1);

    // if there is no left and width, set left and width
    if (!event.left) {
      event.left = left;
    }
    if (!event.width) {
      event.width = width;
    }

    const definedEventCollisions = eventsCollisions.filter(event => {
      return event.left !== undefined;
    });

    // Running on all collisions and setting a location for each colliding event
    for (let index = 1; index < eventsCollisionsLength + 1; index++) {
      // Take event from the event collision
      const eventCollision = eventsCollisions[index - 1] as EventInterface;

      // if there is no left, set left
      if (!eventCollision.left) {
        if (definedEventCollisions.length > 0) {
          left = event.left + event.width >= 600 ? 0 : event.left + event.width;
        } else {
          left = width * index;
        }
        eventCollision.left = left;
      }

      // if there is no width, set width
      if (!eventCollision.width) {
        if (definedEventCollisions.length > 0) {
          width =
            eventCollision.left + event.width >= 600
              ? 600 - width / definedEventCollisions.length
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

/**
 * The function receives an array of events,
 * and returns the array of events with each event and its collisions.
 * @param  {EventInterface[]} events
 * @return {EventInterface[]}
 **/
//  eventsWithAllTheirCollisions
const getEventsWithAllTheirCollisions = (events: EventInterface[]) => {
  const allEvents: EventInterface[] = [];

  // Touch each event for setup, add empty array of collisions to events.
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    event.collisions = [];
    allEvents.push(event);
  }

  // Find collisions for each event, and push them to the event's collisions array.
  while (allEvents.length > 0) {
    const event = allEvents.shift();
    if (event === undefined) break;

    for (let j = 0; j < allEvents.length; j++) {
      const otherEvent = allEvents[j];

      if (eventsCollide(event, otherEvent)) {
        event.collisions?.push(otherEvent);
        otherEvent.collisions?.push(event);
      }
    }
  }
  return events;
};

