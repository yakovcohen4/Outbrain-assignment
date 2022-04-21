import React from 'react';
import { EventInterface } from '../@types';

function Events({ eventsList }: { eventsList: EventInterface[] }) {
  return (
    <div className="events">
      {!eventsList.length && <div className="no-events">No events today</div>}
      {eventsList.map(({ left, width, end, start, title, location }, index) => {
        return (
          <div
            key={index}
            className="event"
            style={{
              left: left,
              width: width,
              height: end - start,
              top: start,
            }}
          >
            <div className="event-information">
              <div className="event-title">{title ? title : 'Sample Item'}</div>
              <div className="event-location">
                {location ? location : 'Sample Location'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Events;
